'use client';

import React, { useEffect } from "react";
import {
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";

function SidaNav() {
  const path = usePathname()
  const routes = useRouter();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path : "/dashboard"
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path : "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path : "/dashboard/expenses"
    },
  ];

  const {user} = useUser();
  useEffect(()=>{
    user&&checkUserBudgets();
  }, [user])

  const checkUserBudgets = async() => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || ""))
    
    if(result?.length ===0) {
      routes.replace('/dashboard/budgets')
    }
  }

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center pt-8 flex-col">
        <div>
            <Link href="/">
          <div className="text-3xl font-bold">
            Tax<span className="text-slate-600"> Homie</span>
          </div>
          </Link>
        </div>
        <div className="mt-20 flex gap-12 flex-col">
        {menuList.map((menu, index)=>(
          <Link key={index} href={menu.path}>
            <h2 key={index} className={`flex flex-row h-10 items-center px-2 rounded-xl transition-all duration-500 ease-in-out cursor-pointer w-36 justify-between ${path == menu.path?"bg-neutral-700 text-white" : ""}`}>
                <menu.icon />
                {menu.name}
            </h2>
            </Link>
        ))}
        </div>
        <div className="mt-14 flex flex-row gap-4 items-center">
            <UserButton />
            <div className="text-lg font-bold">Profile</div>
        </div>
      </div>
    </div>
  );
}

export default SidaNav;
