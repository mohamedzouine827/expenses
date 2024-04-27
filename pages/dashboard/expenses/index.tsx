import ShowExpensesTable from "@/pages/_components/dashboard/budgets/expenses/ShowExpensesTable";
import DashboardLayout from "@/pages/_components/dashboard/layout";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

function Index() {
  interface BudgetData {
    id: number;
    name: string;
    amount: string;
    icon: string | null;
    createdBy: string;
  }

  const { user } = useUser();

  useEffect(() => {
    user && getExpensesList();
  }, [user]);

  const [budgetData, setBudgetData] = useState<BudgetData[]>([]);
  const [expenseItems, setExpenseItems] = useState<BudgetData[]>([]);

  const getExpensesList = async () => {
    const selectUserData = await db
      .select()
      .from(Budgets)
      .where(
        eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || "")
      );

    setBudgetData(selectUserData);

    if (selectUserData.length > 0) {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.createdBy, user?.primaryEmailAddress?.emailAddress || ""))
        .orderBy(desc(Expenses.id));
      setExpenseItems(result);
    }
  };
  return (
    <DashboardLayout >
      <div className="p-10">
        <h2 className="text-3xl font-bold">Latest Expenses</h2>
        <ShowExpensesTable expenseItem={expenseItems} />
      </div>
    </DashboardLayout>
  );
}

export default Index;
