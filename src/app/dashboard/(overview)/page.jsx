import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DashboardHome } from '@/components/ui/DashboardHome'
import { clubCodes } from "@/lib/utils";

const page = async() => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const emailPrefix = session.user.email?.split("@")[0] || "";
  const club = clubCodes[emailPrefix] || emailPrefix;
  const isSuperAdmin = process.env.SUPER_ADMIN === club;

  return (
    <DashboardHome isSuperAdmin={isSuperAdmin}/>
  );
};

export default page