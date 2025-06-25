import React from "react";
import Form from "@/components/Course/edit-form";
import { getCourseDetailsById } from "@/app/actions/CourseData";

export default async function Page({ params }) {
  // console.log("params >>>", params);
  const courseid = params.courseid; // 🔥 use correct param key
  const data = await getCourseDetailsById(courseid);
  // console.log("courseDetails from getCourseDetailsById >>>", data);

  return <Form courseDetails={data} />;
}
