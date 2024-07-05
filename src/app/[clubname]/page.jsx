import React from "react";
import OurProjects from "@/components/ClubPageComponents/OurProjects";
import OurTeam from "@/components/ClubPageComponents/OurTeam";
import OurBlogs from "@/components/ClubPageComponents/OurBlogs";
import Gallery from "@/components/ClubPageComponents/Gallery";
import OurSchedule from "@/components/ClubPageComponents/OurSchedule";
import { clubCodes } from "@/lib/utils";

const page = ({ params }) => {
  const club = params.clubname;
  return (
    <>
      <Gallery club={club} />
      <OurSchedule club={club} />
      <OurTeam club={club} />
      <OurProjects club={club} />
      <OurBlogs club={club} />
    </>
  );
};

export default page;
