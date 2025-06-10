import React from "react";
import ProjectCard from "../ui/ProjectCard";
import { getAllProjects } from "@/app/actions/ProjectData";
import Link from "next/link";

const slugify = (str) =>
str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const OurProjects = async ({club}) => {
  const projects=await getAllProjects(club);

  if(projects.length===0)return null;
  return (
    <div className="w-full mx-auto py-12 pb-24   bg-black  flex flex-col  ">
      <h2 className="text-4xl font-semibold text-center mb-12 text-white">
        Our Projects
      </h2>

      <div className="gap-16 md:gap-10 flex flex-row flex-wrap justify-center items-stretch w-full">
      {projects.map((project, index) => {
        const projectName = slugify(project.title);
        return (
           <Link
              key={project.id}
              href={`/${club}/${projectName}?id=${project.id}`}
            >
          <ProjectCard
            // key={index}
            title={project.title}
            github={project.github}
            website={project.website}
            status={project.status}
            description={project.description}
            image={project.image}
          />
          </Link>
        );
      })}
      </div>
    </div>
  );
};

export default OurProjects;
