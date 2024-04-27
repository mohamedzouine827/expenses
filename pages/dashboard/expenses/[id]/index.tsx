import React, { useEffect, useState } from "react";
import DashboardLayout from "@/pages/_components/dashboard/layout";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import BudgetItem from "@/pages/_components/dashboard/budgets/BudgetItem";
import AddExpenses from "@/pages/_components/dashboard/budgets/expenses/AddExpenses";
import EditBudget from "@/pages/_components/dashboard/budgets/expenses/EditBudget";
import ExpensesListTable from "@/pages/_components/dashboard/budgets/expenses/ExpensesList";
import { PenBox, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Index() {
  const { user } = useUser();
  const router = useRouter();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const budgetId = Number(router.query.id);

  useEffect(() => {
    if (!isNaN(budgetId)) {
      // Proceed with fetching data
      getBudgetInfo();
      getExpensesList();
    } else {
      // Handle the case where router.query.id is not a valid number
      console.error("Invalid budget ID:", router.query.id);
    }
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`sum(CAST(${Expenses.amount} AS DECIMAL))`.mapWith(
          Number
        ),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || "")
      )
      .where(eq(Budgets.id, Number(router.query.id)))
      .groupBy(Budgets.id);
    setBudgetInfo(result[0]);
    getExpensesList();
  };


  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, Number(router.query.id)))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, Number(router.query.id)));
    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, Number(router.query.id)))
        .returning();
      if (result) {
        router.replace("/dashboard/budgets");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="p-10">
        <div className="flex flex-row justify-between mb-4 items-center">
          <h2 className="text-3xl font-bold">My Expenses</h2>
          <div className="flex gap-2">
            <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()}/>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive" className="flex gap-4">
                  <Trash />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the budget and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteBudget()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex flex-row gap-5 justify-between">
          <div className="mt-4 w-[70%]">
            {budgetInfo ? (
              <BudgetItem budget={budgetInfo} />
            ) : (
              <div className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"></div>
            )}
          </div>
          <AddExpenses paramas={router} refreshData={() => getBudgetInfo()} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Latest Expenses</h2>
        <ExpensesListTable
          expItem={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </DashboardLayout>
  );
}

export default Index;
