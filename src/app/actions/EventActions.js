"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import Event from "@/models/events";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

// Define the schema for event validation
const EventSchema = z.object({
  date: z.number().min(1, "Date is required."),
  title: z.string().min(1, "Title is required."),
  venue: z.string().min(1, "Venue is required."),
  time: z.string().min(1, "Time is required."),
  about: z.string().min(1, "About is required."),
});

// Server action to add an event
export async function addEvent(prevState, formData) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validatedFields = EventSchema.safeParse({
    date: parseInt(formData.get("date")),
    title: formData.get("title"),
    venue: formData.get("venue"),
    time: formData.get("time"), // Updated from timing to time
    about: formData.get("about"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add event.",
    };
  }

  // Extract validated data
  const { date, title, venue, time, about } = validatedFields.data;
  const eventObject = {
    date,
    title,
    venue,
    time,
    about,
  };

  // Insert data into the database
  try {
    await connectMongoDB();
    const event = await Event.findOne({ club });

    if (event) {
      event.events.push(eventObject);
      await event.save();
    } else {
      await Event.create({
        events: [eventObject],
        club,
      });
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to add event.",
    };
  }

  // Revalidate the cache for the events page and redirect the user.
  revalidatePath("/dashboard/events");
}

export async function updateEvent(prevState, formData) {
  // Get the user's session and club
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  // Extract the event index and updated fields from form data

  const validatedFields = EventSchema.safeParse({
    date: parseInt(formData.get("date")),
    title: formData.get("title"),
    venue: formData.get("venue"),
    time: formData.get("time"),
    about: formData.get("about"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add event.",
    };
  }

  // Extract validated data
  const { title, venue, time, about, date } = validatedFields.data;
  const updatedEventObj = {
    date,
    title,
    about,
    venue,
    time,
  };

  try {
    await connectMongoDB(); // Connect to the database
    // Find the event for the specified club
    const event = await Event.findOne({ club });

    const foundEventObjectIndex = event.events.findIndex(
      (e) => e.date === date
    );

    event.events[foundEventObjectIndex] = updatedEventObj;

    // Save the updated event
    await event.save();
  } catch (error) {
    return {
      message: "Database Error: Failed to update event.",
      status: 500,
    };
  }

  revalidatePath("/dashboard/events");
}

export async function deleteEventByDate(date) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  try {
    await connectMongoDB();
    const event = await Event.findOne({ club });

    if (!event) {
      return {
        message: "Event not found for the club",
        status: 404,
      };
    }

    // Filter out the event at the specified index
    const updatedEvents = event.events.filter((event) => event.date !== date);

    // If the event to delete was not found
    if (updatedEvents.length === event.events.length) {
      return {
        message: "Event not found",
        status: 404,
      };
    }

    event.events = updatedEvents;
    await event.save();
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      message: "Database Error: Failed to delete event.",
      status: 500,
    };
  }

  // Revalidate the cache for the events page
  revalidatePath("/dashboard/events");
  redirect("/dashboard/events");
}
