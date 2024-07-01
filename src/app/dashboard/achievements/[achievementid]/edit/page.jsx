import React from "react";
import EditAchievementForm from "@/components/Achievements/edit-form";
import { getAchievementById } from "@/app/actions/AchievementData";

export default async function Page({ params, searchParams }) {
  const achievementid = params.achievementid;
  const club = searchParams.club;

  let data = await getAchievementById(club, achievementid);

  return (
    <EditAchievementForm title={data.title} description={data.description} id={data.id}/>
  );
}
