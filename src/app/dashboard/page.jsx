import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async() => {
  const session=await auth()

  if(!session)redirect("/api/auth/signin?callbackURL=/dashboard")
  return (
    <div>Welcome to Dashboard</div>
  )
}

export default page