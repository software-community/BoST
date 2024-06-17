import React from "react";
import Form from "@/components/Blog/edit-form";
import { getBlogById } from "@/app/actions/BlogData";

export default async function Page({ params }) {
  const blogid = params.blogid;
  let data = await getBlogById(blogid);
  
  return <Form blogDetails={data} />;
}
