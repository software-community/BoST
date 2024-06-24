import React from "react";
import ProjectCard from "../ui/ProjectCard";
import { getAllProjects } from "@/app/actions/ProjectData";

// const projects = {
//   projects: [
//     {
//       title: "Project 1",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
//       image: "public/Home/person.jpg",
//     },
//     {
//       title: "Project 2",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
//       image: "public/Home/person.jpg",
//     },
//     {
//       title: "Project 3",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula yayyy.",
//       image: "public/Home/person.jpg",
//     },
//     {
//       title: "Project 4",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
//       image: "public/Home/person.jpg",
//     },
//   ],
// };

const OurProjects = async () => {
    const projects=await getAllProjects(process.env.SUPER_ADMIN)
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
            members={project.members}
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
