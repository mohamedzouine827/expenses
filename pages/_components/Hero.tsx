"use client";
import { Button } from '@/components/ui/button'
import React from 'react'
import dashboard from "@/public/dashboard.jpg"
import Image from 'next/image'
import { useUser } from "@clerk/nextjs"
import Link from 'next/link';

function Hero() {
    const {user , isSignedIn} = useUser();
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Track Your Expense
        <strong className="font-extrabold text-neutral-600 sm:block"> Know Every I/O </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Track expenses effortlessly, gain insights, stay on budget. Take control today!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-8">
        {
            isSignedIn?<Link href="/dashboard"><Button  className="w-52">Go to Dashboard</Button></Link> :<Link href={'/sign-in'}><Button  className="w-52">Get Started</Button></Link>
        }

        
      </div>
    </div>
  </div>
  <div className='flex justify-center items-center mx-auto mt-[-4vh] rounde-3xl h-[20vh] w-[50vw] px-1 py-1 bg-neutral-500'>
  <Image className='w-full rounded-3xl' src={dashboard} width={1250} height={1250} alt='dashboard context'/>
  </div>
</section>
  )
}

export default Hero