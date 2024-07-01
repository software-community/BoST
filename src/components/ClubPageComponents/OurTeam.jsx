import React from "react";
import TeamMember from "../ui/TeamMember";
import { getAllTeamMembers } from "@/app/actions/TeamData";



export default async function OurTeam({club}) {
    const team=await getAllTeamMembers(club)
    return (
        
        <div className=" w-full mx-auto py-12 pb-24  rounded-lg  flex flex-col  ">
            <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-6 text-black">
              Meet  Our Team
            </h2>
          
         
            <div className="gap-6 flex flex-row flex-wrap justify-center items-center w-full ">
                {team.map((member, index) => (
                    <TeamMember key = {index} name = {member.name} role = {member.position} image = {member.image} />
                ))}
            </div>
        </div>

            );

}