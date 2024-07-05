import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DashboardHome } from '@/components/ui/DashboardHome'
import { clubCodes } from "@/lib/utils";

const page = async() => {
  const session=await auth()
  const club = clubCodes[session?.user.email.split("@")[0]];
  const isSuperAdmin = process.env.SUPER_ADMIN === club;

  if(!session){
    redirect("/")
  }
  return (
    // <div>Welcome to Dashboard {session?.user.name}</div>
    <DashboardHome isSuperAdmin={isSuperAdmin}/>
  )
}

export default page