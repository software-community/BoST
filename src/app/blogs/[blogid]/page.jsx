import React from "react";
import { getBlogById } from "@/app/actions/BlogData";
import parse from "html-react-parser";

const page = async ({ params }) => {
  const blogid = params.blogid;
  const blogDetails = await getBlogById(blogid);
  return <div className="min-h-[70vh] flex  flex-col gap-8 items-center py-8">
    <h1 className="w-full text-center text-3xl">{blogDetails.title}</h1>
    <p className="w-4/5 text-xl max-w-[750px]">{parse(blogDetails.content)}</p>
    <div className="flex items-center w-4/5  max-w-[750px] justify-between text-sm">
        <span className="bg-gray-300 p-1 sm:p-2 rounded-sm">Author: {blogDetails.author}</span>
        <span  className="bg-gray-300 p-1 sm:p-2 rounded-sm">Club: {blogDetails.club}</span>
    </div>
  </div>;
};

export default page;