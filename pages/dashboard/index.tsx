import { useUser } from "@clerk/nextjs"
import DashboardLayout from "../_components/dashboard/layout"
import CardInfo from "../_components/dashboard/CardInfo";
import { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";


import {desc, eq, getTableColumns, sql} from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import DashboardInfo from "../_components/dashboard/budgets/DashboardInfo";



function Index() {


  const [budgetInfo, setBudgetInfo] = useState();
  const getBudgetInfo = async() => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpent: sql `sum(CAST(${Expenses.amount} AS DECIMAL))`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || ''))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

    setBudgetInfo(result);
  }
  

  const {user} = useUser();

  useEffect(()=> {
    user&&getBudgetInfo();
  }, [user])
  return (
    <DashboardLayout>
        <div className="p-10 text-4xl font-bold">
          <h1>
            Hello <span className="text-neutral-700 uppercase">{user?.fullName}</span>
          </h1>
        </div>
        <div className="pl-10 pr-10">
        <CardInfo budgetInformation={budgetInfo}/>
        </div>
        <div className="border-2 rounded-lg  m-10 p-4">
          <DashboardInfo gadgetInfo={budgetInfo}/>
        </div>
    </DashboardLayout>
  )
}

export default Index