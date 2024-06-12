import React from "react";
import { getAllTeamMembers } from "@/app/actions/TeamData";

const page = async () => {
  const data = await getAllTeamMembers();
  console.log(data);
  return <>
  {data?.map((item,i)=><p>{item.name}</p>)}
  </>
};

export default page;
