import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'sonner';


function AddExpenses( {paramas, refreshData}: { paramas: any, refreshData: () => void }) {
    const { user } = useUser();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const router = useRouter();
    const addNewExpense = async () => {
      if (!name || !amount || !user?.primaryEmailAddress?.emailAddress) {
          // Handle case where required fields are not filled
          toast.error('Please fill out all fields');
          return;
      }
  
      const result = await db.insert(Expenses).values({
          name: name,
          amount: amount,
          createdAt: moment().format('DD/MM/yyyy'), // Fixed typo in 'yyyy'
          budgetId: Number(router.query.id),
          createdBy: user.primaryEmailAddress.emailAddress
      }).returning({ insertedId: Expenses.id }); // Changed 'Budgets.id' to 'Expenses.id'
  
      if (result) {
          toast.success('New Expense Added');
          refreshData();
      } else {
          toast.error('Failed to add expense');
      }
  }

  return (
    <div className='border-2 w-full shadow-lg p-4'>
        <div >
            <h2 className='text-xl font-bold'>Add Expenses</h2>
            <div className=" flex flex-col gap-2">
              <h2 className="text-black font-medium my-1">Expense Name</h2>
              <Input required placeholder="e.g. Home Car..." onChange={(e) =>setName(e.target.value)}/>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h2 className="text-black font-medium my-1">Expense Amout</h2>
              <Input required type="number" placeholder="e.g. 200 300..." onChange={(e) =>setAmount(e.target.value)}/>
            </div>
            <div className='mt-3 flex justify-center ]'>
            <Button onClick={()=>addNewExpense()} className='w-[55%]' >Add Expense</Button>
            </div>
            </div>
    </div>
  )
}

export default AddExpenses