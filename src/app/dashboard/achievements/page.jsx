import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth();
  const club = session?.user.email.split('@')[0];
  const isSuperAdmin=process.env.SUPER_ADMIN===club
  // Check if the session user email is not equal to process.env.SUPER_ADMIN
  if (!isSuperAdmin) {
    redirect('/');
    return null; // Return null to prevent further rendering
  }

  return (
    <div>Welcome to Achievements {session?.user?.name}</div>
  );
}

export default Page;
