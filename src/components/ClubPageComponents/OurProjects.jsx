import React from "react";
import ProjectCard from "../ui/ProjectCard";
import { getAllProjects } from "@/app/actions/ProjectData";


const OurProjects = async ({club}) => {
    const projects=await getAllProjects(club)
  return (
    <div className="w-full mx-auto py-12 pb-24   bg-black  flex flex-col  ">
      <h2 className="text-4xl font-semibold text-center mb-12 text-white">
        Our Projects
      </h2>

      <div className="gap-16 md:gap-10 flex flex-row flex-wrap justify-center items-center w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            github={project.github}
            website={project.website}
            status={project.status}
            description={project.description}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
};

export default OurProjects;
