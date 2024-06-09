import React from "react";
import TeamMember from "./ui/TeamMember";


const team = {
    members: [
        {
        name: "John Doe",
        role: "CEO",
        image: "public/Home/person.jpeg",
        },
        {
        name: "Jane Doe",
        role: "CTO",
        image: "public/Home/person.jpeg",
        },
        {
        name: "Alice",
        role: "Developer",
        image: "public/Home/person.jpeg",
        },
        {
        name: "Bob",
        role: "Designer",
        image: "public/Home/person.jpeg",
        },
    ],
    };


export default function TeamPage() {
    return (
        
        <div className="container w-full mx-auto py-12 lg:h-screen md:h-screen sm:h-[150vh] rounded-lg bg-black flex flex-col  ">
            <h2 className="text-5xl font-semibold text-center mb-6 text-white">
                Our Team
            </h2>
            <hr className="mb-30">
            </hr>
            <br>
            </br>
            <br>
            </br>
            <div className="gap-6 flex flex-row flex-wrap justify-center items-center w-full ">
                {team.members.map((member, index) => (
                    <TeamMember key = {index} name = {member.name} role = {member.role} image = {member.image} />
                ))}
            </div>
        </div>

            );

}