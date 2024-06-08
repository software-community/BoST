import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async() => {
  const session=await auth()

  if(!session){
    redirect("/")
  }
  return (
    <div>Welcome to Dashboard {session?.user.name}</div>
  )
}

export default page