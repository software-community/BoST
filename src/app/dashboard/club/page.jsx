import React from "react";
import Form from "@/components/ClubDash/edit-form";
import { getClubDetails } from "@/app/actions/ClubData";
import { clubCodes } from "@/lib/utils";
import { auth } from "@/auth";

export default async function Page({ params }) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
  let clubData = await getClubDetails(club);
  clubData = clubData.toJSON();
  clubData._id = clubData._id.toString();

  return <Form clubData={clubData} />;
}
