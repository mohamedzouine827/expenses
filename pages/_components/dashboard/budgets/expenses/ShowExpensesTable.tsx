import React from 'react'

function ShowExpensesTable( {expenseItem}) {
  return (
    <div className='mt-10'>
        <div className='grid grid-cols-3 bg-slate-200 p-2'>
                <h1 className='text-base font-semibold uppercase'>Name</h1>
                <h1 className='text-base font-semibold uppercase'>Amount</h1>
                <h2 className='text-base font-semibold uppercase'>Date</h2>
            </div>
            <div className='flex flex-col gap-1 mt-1'>
            {
                expenseItem.map((exp, index) => (
                    <div className='grid grid-cols-3 gap-2 bg-slate-100 p-2' key={index}>
                        <h2>{exp.name}</h2>
                        <h2>{exp.amount}</h2>
                        <h2>{exp.createdAt}</h2>
                        
                    </div>
                ))
            }
            </div>
    </div>
  )
}

export default ShowExpensesTable