import React from "react";
import TeamMember from "../ui/TeamMember";
import { getAllTeamMembers } from "@/app/actions/TeamData";



export default async function OurTeam() {

    // const team = {
    //     members: [
    //         {
    //             name: "John Doe",
    //             role: "CEO",
    //             image: "public/Home/person.jpeg",
    //         },
    //         {
    //             name: "Jane Doe",
    //             role: "CTO",
    //             image: "public/Home/person.jpeg",
    //         },
    //         {
    //             name: "Alice",
    //             role: "Developer",
    //             image: "public/Home/person.jpeg",
    //         },
    //         {
    //             name: "Bob",
    //             role: "Designer",
    //             image: "public/Home/person.jpeg",
    //         },
    //     ],
    // };
    const team=await getAllTeamMembers(process.env.SUPER_ADMIN)
    return (

        <div className=" w-full mx-auto py-12 pb-24  rounded-lg  flex flex-col  ">
            <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-6 text-black">
                Meet  Our Team
            </h2>


            <div className="gap-6 flex flex-row flex-wrap justify-center items-center w-full ">
                {team.map((member, index) => (
                    <TeamMember 
                        key={index} 
                        name={member.name} 
                        role={member.position} 
                        image={member.image} 
                        email={member.email}
                        github={member.github}
                        linkedin={member.linkedin}
                    />
                ))}
            </div>
        </div>

    );

}