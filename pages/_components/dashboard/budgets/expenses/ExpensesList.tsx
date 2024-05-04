import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpensesListTable({ expItem, refreshData }: { expItem: any[], refreshData: () => void }) {

    const deleteExpense = async (exp) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, exp.id))
            .returning();
        
        if (result) {
            console.log(result)
            toast('Expense Deleted!');
            refreshData();
        }
    }

    return (
        <div>
            <div className='grid grid-cols-4 bg-slate-200 p-2'>
                <h1>Name</h1>
                <h1>Amount</h1>
                <h2>Date</h2>
                <h1>Action</h1>
            </div>
            {
                expItem.map((exp, index) => (
                    <div className='grid grid-cols-4 bg-slate-100 p-2' key={index}>
                        <h2>{exp.name}</h2>
                        <h2>{exp.amount}</h2>
                        <h2>{exp.createdAt}</h2>
                        <h2>
                            <Trash className='cursor-pointer' onClick={() => deleteExpense(exp)} />
                        </h2>
                    </div>
                ))
            }
        </div>
    )
}

export default ExpensesListTable
