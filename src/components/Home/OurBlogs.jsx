import React from "react";
import { getAllBlogs } from "@/app/actions/BlogData";
import { BlogCard } from "../ui/BlogCard";

export default async function OurBlogs() {
  const Blogs = await getAllBlogs(process.env.SUPER_ADMIN);
  return (
    <div className=" w-full mx-auto py-12 pb-24  rounded-lg  flex flex-col  ">
      <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-6 text-black">
        Our Recent Blogs
      </h2>

      <div className="gap-6 flex flex-row flex-wrap justify-center items-center w-full ">
        {Blogs.map(({ id, title, brief, author, club }, index) => (
          <BlogCard
            key={id}
            id={id}
            title={title}
            brief={brief}
            author={author}
            club={club}
          />
        ))}
      </div>
    </div>
  );
}
