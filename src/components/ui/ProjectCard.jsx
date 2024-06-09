import React from 'react';

const ProjectCard = ({title, description, image}) => {
  return (
    <div className="text-black bg-slate-100 w-72 h-48 rounded-lg flex flex-col flex-none justify-center items-center transform transition duration-300 hover:scale-105">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
        <img className = "object-fit relative lg:w-80 md:h-40 md:w-[90vw] sm:h-40 sm:w-[100vw] h-40 w-[80vw] lg:h-40 overflow-hidden rounded-xl text-white shadow-lg shadow-gray"src ="/Home/person.jpeg" alt = {title}></img>
      </div>
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </div>
  );
};

export default ProjectCard;
