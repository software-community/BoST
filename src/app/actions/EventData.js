import Event from "@/models/events";
import connectMongoDB from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getEventsForClub(club) {
  noStore(); // Ensure no caching is done
  try {
    await connectMongoDB();
    const eventRecord = await Event.findOne({ club });

    if (!eventRecord) {
      return [];
    }
    return eventRecord.events;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve events.",
    };
  }
}

// Server action to get events for a club on a specific date
export async function getEventsForClubAndDate(club, date) {
  noStore(); // Ensure no caching is done
  try {
    await connectMongoDB();
    const eventRecord = await Event.findOne({ club });

    if (!eventRecord) {
      return {};
    }

    const foundEventObject = eventRecord.events.findOne((e) => e.date === date);
    console.log("founded", foundEventObject);

    return foundEventObject;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve events.",
    };
  }
}
