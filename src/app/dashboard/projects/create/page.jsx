import React from 'react'
import Form from '@/components/Project/create-form'
import { auth } from '@/auth'
import { clubCodes } from '@/lib/utils'
import { getAllTeamMembers } from '@/app/actions/TeamData'

const page = async () => {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  const teamMembers = await getAllTeamMembers(club);
  return (
    <Form teamMembers={teamMembers} />
  )
}

export default page