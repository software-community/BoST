import React from "react";
import Form from "@/components/Course/module-edit-form";
import { getModuleDetails } from "@/app/actions/CourseData";

export default async function ModuleEditPage({ params }) {
  const { courseid, moduleid } = params;

  const moduleDetails = await getModuleDetails(courseid, moduleid);

  if (moduleDetails?.message) {
    return <div className="text-red-500">{moduleDetails.message}</div>;
  }

  return <Form courseid={courseid} moduleDetails={moduleDetails} />;
}
