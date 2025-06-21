import React from "react";
import Form from "@/components/Project/edit-form";
import { getProjectById } from "@/app/actions/ProjectData";

export default async function Page({ params }) {
  // console.log("params >>>", params);
  const projectid = params.projectid;
  let data = await getProjectById(projectid);
  // console.log("projectDetails from getProjectById >>>", data);
  
  return <Form projectDetails={data} />;
}
