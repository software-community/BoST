import React from "react";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import Link from "next/link";


const statusMap = {
  completed: "Completed",
  in_progress: "In Progress",
  not_started: "Not Started",
};

const ProjectCard = ({
  title,
  description,
  image,
  website,
  github,
  status,
  members,
  imageLink,
}) => {
  
  return (
    <div className="text-white bg-[#0d1117] border border-zinc-800 hover:border-primary/50 w-72 lg:w-[350px] h-[480px] py-8 shadow-xl shadow-cyan-950/20 px-4 lg:px-6 rounded-xl flex flex-col flex-none justify-start items-center transform transition-all hover:scale-105">
      <div className="w-full h-auto px-2 flex justify-between gap-2 text-primary items-center mb-4">
        <span className="bg-zinc-900 border border-zinc-800 text-cyan-300 rounded-md px-2.5 py-1 text-[12px] font-medium">
          Status: {statusMap[status]}
        </span>
        <div className="flex gap-2">
          <Link className="hover:scale-110 text-primary hover:text-cyan-300 transition-all" href={github} target="_blank" rel="noopener noreferrer">
            <IconBrandGithub size={26} />
          </Link>
          <Link className="hover:scale-110 text-primary hover:text-cyan-300 transition-all" href={website} target="_blank" rel="noopener noreferrer">
            <IconWorld size={26} />
          </Link>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full h-[200px] overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800">
        {imageLink ? (
          <Link href={imageLink.href} target={imageLink.target} rel={imageLink.rel} className="w-full h-full">
            <img className="w-full h-full object-cover object-center" src={image} alt={title} />
          </Link>
        ) : (
          <img className="w-full h-full object-cover object-center" src={image} alt={title} />
        )}
      </div>
      <h3 className="text-lg lg:text-xl font-semibold text-center mt-4 mb-2 text-white">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 text-center line-clamp-3">
        {description.trim().length < 25 ? description : description.trim().substring(0, 100) + '...'}
      </p>
    </div>
  );
};

export default ProjectCard;
