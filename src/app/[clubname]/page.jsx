import React from "react";
import Hero from "@/components/ClubPageComponents/Hero";
import OurProjects from "@/components/ClubPageComponents/OurProjects";
import OurTeam from "@/components/ClubPageComponents/OurTeam";
import OurBlogs from "@/components/ClubPageComponents/OurBlogs";
import Gallery from "@/components/ClubPageComponents/Gallery";
import OurSchedule from "@/components/ClubPageComponents/OurSchedule";
import { clubCodes } from "@/lib/utils";
import { getClubDetails } from "../actions/ClubData";

export async function generateMetadata({ params, searchParams }, parent) {
  const club = (await params).clubname;
  const id = clubCodes[club];
  const clubName = (await getClubDetails(id)).name;
  // console.log(await parent);
  return {
    title: `${clubName} | ${(await parent).title.absolute}`,
  }
}

const page = ({ params }) => {
  const club = params.clubname;
  return (
    <>
      <Hero club={club} />
      <OurSchedule club={club} />
      <OurTeam club={club} />
      <OurProjects club={club} />
      <Gallery club={club} />
      <OurBlogs club={club} />
    </>
  );
};

export default page;
