"use server"
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

      eventRecord = await Event.find({ club }).sort({order:1});
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

export async function moveEventUp(eventId, club) {
  // "use server"
  try {
    await connectMongoDB();
    const events = await Event.find({ club }).sort({ order: 1 });
    const currentIndex = events.findIndex(e => e._id.toString() === eventId);
    
    if (currentIndex > 0) {
      // Swap order values
      const temp = events[currentIndex].order;
      events[currentIndex].order = events[currentIndex - 1].order;
      events[currentIndex - 1].order = temp;
      
      await events[currentIndex].save();
      await events[currentIndex - 1].save();
    }
  } catch (error) {
    return { message: "Failed to move event up" };
  }
  // revalidatePath("/dashboard/events");
}

export async function moveEventDown(eventId, club) {
  try {
    await connectMongoDB();
    const events = await Event.find({ club }).sort({ order: 1 });
    const currentIndex = events.findIndex(e => e._id.toString() === eventId);
    
    if (currentIndex < events.length - 1) {
      // Swap order values
      const temp = events[currentIndex].order;
      events[currentIndex].order = events[currentIndex + 1].order;
      events[currentIndex + 1].order = temp;
      
      await events[currentIndex].save();
      await events[currentIndex + 1].save();
    }
  } catch (error) {
    return { message: "Failed to move event down" };
  }
  // revalidatePath("/dashboard/events");
}