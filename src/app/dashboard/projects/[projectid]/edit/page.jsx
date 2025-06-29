import React from "react";
import Form from "@/components/Project/edit-form";
import { getProjectById } from "@/app/actions/ProjectData";
import { auth } from '@/auth';
import { clubCodes } from '@/lib/utils';
import { getAllTeamMembers } from '@/app/actions/TeamData';

export default async function Page({ params }) {
  // console.log("params >>>", params);
  const projectid = params.projectid;
  let data = await getProjectById(projectid);
  // console.log("projectDetails from getProjectById >>>", data);
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  const teamMembers = await getAllTeamMembers(club);
  
  return <Form projectDetails={data} teamMembers={teamMembers} />;
}
