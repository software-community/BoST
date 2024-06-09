import React from 'react';

const ProjectCard = ({title, description, image}) => {
  return (
    <div className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg lg:h-42 lg:w-70 gap-2 justify-around hover:shadow-xl bg-white p-2 g-2 mt-2 mb-2">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img className = "object-cover relative lg:w-80 md:h-40 md:w-[90vw] sm:h-40 sm:w-[100vw] h-40 w-[80vw] lg:h-40 overflow-hidden rounded-xl text-white shadow-lg shadow-gray"src = {image} alt = {title}></img>
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-lg sm:text-xl md:text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h5>
        <p className="block font-sans text-sm sm:text-base md:text-lg font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
