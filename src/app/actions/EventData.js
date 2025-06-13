import Event from "@/models/events";
import connectMongoDB from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getEventsForClub(club) {
  noStore(); // Ensure no caching is done
  try {
    await connectMongoDB();
    var eventRecord;
    if(club===process.env.SUPER_ADMIN)
    {
      const allEventRecord = await Event.find();

      eventRecord = allEventRecord.filter(event => {
        const datetimeStr = `${event.date}T${event.time}:00Z`;
        const eventDateTime = new Date(datetimeStr);
        return eventDateTime > new Date();
      });


    }


    else{

      eventRecord = await Event.find({ club });
    }

    if (!eventRecord) {
      return [];
    }

    return eventRecord;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve events.",
    };
  }
}

export async function getEventById(eventid)
{
  noStore();
  try{
    await connectMongoDB();
    const eventRecord = await Event.find({_id:eventid})

    if(!eventRecord)
    {
      return [];
    }
    return eventRecord;
  }
  catch(error)
  {
    message: "Database Error : Failed to retrieve events"
  }
}

// Server action to get events for a club on a specific date
export async function getEventsForClubAndDate(club, id) {
  noStore(); // Ensure no caching is done
  try {
    await connectMongoDB();
    const eventRecord = await Event.find({ club });

    if (!eventRecord) {
      return {};
    }

    const foundEventObject = eventRecord.findOne((e) => e.id === id);
    console.log("founded", foundEventObject);

    return foundEventObject;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve events.",
    };
  }
}
