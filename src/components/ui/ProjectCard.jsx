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
}) => {
  
  return (
    <div className="text-black bg-gray-200 w-72 lg:w-[350px] h-[480px] py-12   shadow-white px-4 lg:px-6 rounded-lg flex flex-col flex-none justify-start items-center transform transition-all hover:scale-105">
      <div className="w-full h-auto px-4  flex justify-between gap-2 text-primary items-center mb-4  ">
        <span className="bg-gray-300 rounded-md p-2 text-[12px]">
          Status: {statusMap[status]}
        </span>
        <div className="flex ">
          {" "}
          <Link className="hover:scale-75 transition-all" href={github}>
            <IconBrandGithub size={32} />
          </Link>
          <Link className="hover:scale-75 transition-all" href={website}>
            <IconWorld size={32} />
          </Link>
        </div>
      </div>
      <div className="relative flex items-center justify-centre mx-4 w-[90%] h-[200px] overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
        <img className=" min-w-full object-cover object-center" src={image} alt={title}></img>
      </div>
      <h3 className="text-lg lg:text-2xl font-semibold text-center mt-4 mb-4">
        {title}
      </h3>
      <p className="text-sm lg:text-lg text-gray-500 text-center">
        {description.trim().length < 25 ? description : description.trim().substring(0, 100) + '...'}
      </p>
      {/* <div className="w-full h-auto  flex justify-between gap-2 text-primary items-center  ml-4 mt-4 ">
        <span className="bg-gray-300 rounded-md p-2 text-[12px]">
          Members: {members}
        </span>
      </div> */}
    </div>
  );
};

export default ProjectCard;
