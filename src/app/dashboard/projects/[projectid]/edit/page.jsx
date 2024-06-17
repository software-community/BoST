import React from "react";
import Form from "@/components/Project/edit-form";
import { getProjectById } from "@/app/actions/ProjectData";

export default async function Page({ params }) {
  const projectid = params.projectid;
  let data = await getProjectById(projectid);
  
  return <Form projectDetails={data} />;
}
