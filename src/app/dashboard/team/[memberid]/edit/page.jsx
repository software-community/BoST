import React from "react";
import Form from "@/components/Team/edit-form";
import { getTeamMemberById } from "@/app/actions/TeamData";

export default async function Page({ params }) {
  const memberid = params.memberid;
  const data = await getTeamMemberById(memberid);

  

  return <Form memberDetails={data} />;
}
