import React from 'react'
import ProjectCard from './ui/ProjectCard'

const projects = {
    projects: [
        {
        title: "Project 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
        image: "../home/person.jpeg",
        },
        {
        title: "Project 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
        image: "../home/person.jpeg",
        },
        {
        title: "Project 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula yayyy.",
        image: "../home/person.jpeg",
        },
        {
        title: "Project 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
        image: "../home/person.jpeg",
        },
    ],
    };


const Aboutprojects = () => {
  return (
    <div className="container w-full mx-auto py-12 lg:h-screen lg:w-100vw md:h-screen md:h-[150vh] sm:h-[200vh] rounded-lg bg-black justify-center items-center ">
        <h2 className="text-5xl font-semibold text-center mb-6 text-white">
            Our Projects
        </h2>
        <hr>
        </hr>
        <br>
        </br>
        <br>
        </br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.projects.map((project, index) => (
                <ProjectCard key = {index} title = {project.title} description = {project.description} image = {project.image} />
            ))}
        </div>
    </div>
  )
}

export default Aboutprojects