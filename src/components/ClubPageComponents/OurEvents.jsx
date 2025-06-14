import React from "react";
import { getEventsForClub } from "@/app/actions/EventData";
import EventCarousel from "../ui/EventCarousel";
import { getClubDetails } from "@/app/actions/ClubData";

const OurEvents = async ({ club }) => {
  const eventInitial = await getEventsForClub(club);


// Ensure all events are plain objects first
const events = eventInitial.map(event => event.toObject?.() || event);

for (const event of events) {
    const clubDetailsDoc = await getClubDetails(event.club);
    const clubDetails = clubDetailsDoc?.toObject?.() || {};
    event.clubLogo = clubDetails.logo;

}





  

  return (
    <div>
      <div className="w-full mx-auto py-12 pb-24   bg-black  flex flex-col  ">
        <h2 className="text-4xl font-semibold text-center mb-12 text-white">
          Our Events
        </h2>
        <div classname="w-full mx-auto">
          <EventCarousel events={events} />
        </div>
      </div>
    </div>
  );
};

export default OurEvents;
