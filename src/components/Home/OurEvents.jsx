import React from 'react'
import { getEventsForClub } from '@/app/actions/EventData'
import EventCarousel from '../ui/EventCarousel';
import { getClubDetails } from '@/app/actions/ClubData';

const OurEvents = async () => {
    const eventsInitial = await getEventsForClub(process.env.SUPER_ADMIN);
    const approvedEvents = eventsInitial.filter(ev => ev.ap === true);



    // Ensure all events are plain objects first
    const finalEvents = approvedEvents.map(event => event.toObject?.() || event);
    
    for (const event of finalEvents) {
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
        <div classname="max-w-4xl mx-auto">

        <EventCarousel events={finalEvents}/>
        </div>
        </div>
    </div>
      );
}

export default OurEvents
