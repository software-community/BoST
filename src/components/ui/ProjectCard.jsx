import React from "react";

const ProjectCard = ({ title, description, image }) => {
  return (
    <div className="text-black bg-gray-200 w-72 lg:w-[350px] py-12   shadow-white px-4 lg:px-6 rounded-lg flex flex-col flex-none justify-center items-center transform transition duration-300 hover:scale-105">
      <div className="relative mx-4 w-[90%]  overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
        <img className=" w-full" src={image} alt={title}></img>
      </div>
      <h3 className="text-lg lg:text-xl font-semibold text-center mt-4 mb-4">{title}</h3>
      <p className="text-sm lg:text-lg text-gray-500 text-center">{description}</p>
     
    </div>
  );
};

export default ProjectCard;
