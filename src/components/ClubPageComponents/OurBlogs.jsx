import React from "react";
import TeamMember from "../ui/TeamMember";
import { getAllTeamMembers } from "@/app/actions/TeamData";
import { getAllBlogs } from "@/app/actions/BlogData";
import { BlogCard } from "../ui/BlogCard";

export default async function OurBlogs({club}) {
  const Blogs = await getAllBlogs(club);
  return (
    <div className=" w-full mx-auto py-12 pb-24  rounded-lg  flex flex-col  ">
      <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-6 text-black">
        Our Recent Blogs
      </h2>

      <div className="gap-6 flex flex-row flex-wrap justify-center items-center w-full ">
        {Blogs.map(({ id, title, content, author, club }, index) => (
          <BlogCard
            key={id}
            title={title}
            content={content}
            author={author}
            club={club}
          />
        ))}
      </div>
    </div>
  );
}
