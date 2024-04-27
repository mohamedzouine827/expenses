import { ListChecksIcon, PiggyBank, Wallet2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({budgetInformation}: {budgetInformation: any}) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    useEffect(()=> {
        budgetInformation&&calculateBudget();
    },[budgetInformation])

    const calculateBudget = () => {
        let budgetItem_ = 0
        let totalSpent_ = 0
        budgetInformation.forEach((element: any) => {
            budgetItem_ += Number(element.amount)
            totalSpent_ += Number(element.totalSpent)

        });
        setTotalBudget(budgetItem_);
        setTotalSpent(totalSpent_);

    }
  return (
    <div >
        {budgetInformation? 
        <div className='mt-7 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='p-7 border rounded-lg flex flex-row justify-between items-center shadow-lg'>
            <div className='flex gap-4 flex-col'>
                <h2 className='text-sm'>
                    Total Budget
                </h2>
                <h2 className='font-bold text-2xl'>
                    $ {totalBudget}
                </h2>
            </div>
            <PiggyBank className='bg-neutral-400 h-12 w-12 p-3 rounded-full'/>
        </div>
        <div className='p-7 border rounded-lg flex flex-row justify-between items-center shadow-lg'>
            <div className='flex gap-4 flex-col'>
                <h2 className='text-sm'>
                    Total Spent
                </h2>
                <h2 className='font-bold text-2xl'>
                    $ {totalSpent}
                </h2>
            </div>
            <Wallet2Icon className='bg-neutral-400 h-12 w-12 p-3 rounded-full'/>
        </div>
        <div className='p-7 border rounded-lg flex flex-row justify-between items-center shadow-lg'>
            <div className='flex gap-4 flex-col'>
                <h2 className='text-sm'>
                    No. Items
                </h2>
                <h2 className='font-bold text-2xl'>
                    {budgetInformation?.length}
                </h2>
            </div>
            <ListChecksIcon className='bg-neutral-400 h-12 w-12 p-3 rounded-full'/>
        </div>
        </div>
        :
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                [1,2,3].map((key, index)=> (
                    <div key={index} className='h-[125px] w-full bg-slate-200 animate-pulse rounded-lg'>

                    </div>
                ))
            }
        </div>}
       
    </div>
  )
}

export default CardInfo