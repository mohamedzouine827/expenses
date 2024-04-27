import React, { ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"


interface LayoutProps {
  children: ReactNode;
}

import SidaNav from './SidaNav'
import DashBoardHeader from './DashBoardHeader'

function DashboardLayout({children}: LayoutProps) {
  return (
    <div>
        <div className='fixed w-64 px-4 pt-4'>
            <div className='bg-neutral-300 rounded-xl'>
            <SidaNav />
            </div>
        </div>
    <div className='ml-64 '>
        <Toaster />
        {children}</div>
    </div>
  )
}

export default DashboardLayout