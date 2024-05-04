import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

interface Budget {
  id: number;
  name: string;
  totalSpent: number;
  totalItem: number;
  // Add other properties as needed
}

function BudgetsList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<Budget[]>([]); // Specify type as Budget[]

  useEffect(() => {
    user && getBudgetList();
  }, [user]); // Remove budgetList from dependency array

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`sum(CAST(${Expenses.amount} AS DECIMAL))`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || ''))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div>
      <div className='grid  grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList.length > 0 ? (
          budgetList.map((budget, index) => <BudgetItem key={index} budget={budget} />)
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetsList;
