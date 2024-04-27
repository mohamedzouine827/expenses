import Link from "next/link"
import { useEffect } from "react";


function BudgetItem({ budget }: { budget: any }) {
    useEffect(()=> {
        progressBar();
    })
    const progressBar = () => {
        const perc = (budget.totalSpent/budget.amount)*100;
        return perc.toFixed(2);
        
    }
  return (
    <Link href={"/dashboard/expenses/"+budget.id}>
    <div className="p-5 border rounded-lg hover:shadow-md duration-300 ease-in-out transition-all cursor-pointer ">
        <div className="flex flex-row gap-3 items-center">
            <div className="flex gap-2 items-center justify-between w-full">
            <div className="flex gap-2 items-center ">
            <h2 className="text-3xl p-2 bg-slate-100 rounded-full ">
                {budget.icon}
            </h2>
            <div>
            <h2 className="text-lg font-medium">
                {budget.name}
            </h2>
            <h2>
                {budget.totalItem} items
            </h2>
            </div>
            
            </div>
            <h2 className="font-bold text-lg">${budget.amount}</h2>
            </div>
        </div>
        <div className="mt-4 flex flex-row justify-between w-full text-xs mb-2 text-gray-700">
            <h2>${budget.totalSpent?budget.totalSpent: 0}</h2>
            <h2>${budget.amount-budget.totalSpent}</h2>
        </div>
        <div className="mt-4">
            <div className="w-[100%] bg-gray-400 h-2 rounded-full">
                <div className={`h-2 rounded-full bg-slate-950`} style={{
                    width: `${progressBar()}%`
                }}>

                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default BudgetItem