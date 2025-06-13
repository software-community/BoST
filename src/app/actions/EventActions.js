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
  date: z.string().min(1, "Date is required."),
  event: z.string().min(1, "Event is required."),
  venue: z.string().min(1, "Venue is required."),
  time: z.string().min(1, "Time is required."),
  desc: z.string().min(1, "Description is required."),
  image: z.string().min(1, "Image is required."),
});

// Server action to add an event
export async function addEvent(prevState, formData) {
  const session = await auth();
  const _club = clubCodes[session?.user.email.split("@")[0]];
  
  const validatedFields = EventSchema.safeParse({
    date: formData.get("date"),
    event: formData.get("event"),
    venue: formData.get("venue"),
    club:_club,
    time: formData.get("time"), // Updated from timing to time
    desc: formData.get("desc"),
    image:formData.get("image")
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add event.",
    };
  }

  const ap = false;

  // Extract validated data
  const { date, event, venue, time, desc, image } = validatedFields.data;
  const eventObject = {
    date,
    event,
    venue,
    time,
    desc,
    image,
    club:_club,
  };



  // Insert data into the database
  try {
    await connectMongoDB();
    await Event.create({
      date,
      event,
      venue,
      time,
      desc,
      image,
      club:_club,
      ap
    })
    
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error.message)
    return {
      message: "Database Error: Failed to add event.",
    };
  }

  // Revalidate the cache for the events page and redirect the user.
  revalidatePath("/dashboard/events");
  redirect("/dashboard/events");
}








export async function deleteEvent(id) {
  // Connect to the database
  try {
    await connectMongoDB();

    // Attempt to delete the team member by their ID
    const result = await Event.findByIdAndDelete(id);

    // Check if the team member was not found
    if (!result) {
      return {
        message: "Event not found.",
      };
    }
  } catch (error) {
    // If a database error occurs, return a more specific error
    return {
      message: "Database Error: Failed to delete Event.",
    };
  }

  // Revalidate the cache for the team members page and redirect the user
  revalidatePath("/dashboard/events");
}






export async function updateEvent(_id,prevState,formData) {
  const session = await auth();
  const _club = clubCodes[session?.user.email.split("@")[0]];
  // const formData = new FormData();
  // Validate form using Zod

  // console.log("Chua")
  
  const validatedFields = EventSchema.safeParse({
      event: formData.get("event"),
      venue: formData.get("venue"),
      image: formData.get("image"),
      date: formData.get("date"),
      club: _club,
      time: formData.get("time"),
      desc: formData.get("desc"),
    });
    

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update team member.",
    };
  }

  // Extract validated data
  const { event, desc, image, time, date, venue } = validatedFields.data;
  

  // Insert data into the database
  try {
    await connectMongoDB();
    await Event.findByIdAndUpdate(_id, {
      event,
      date,
      club:_club,
      venue,
      desc,
      time,
      image
    },{ new: true });

  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update team member.",
    };
  }

  // Revalidate the cache for the team members page and redirect the user.
  revalidatePath("/dashboard/events");
  redirect("/dashboard/events");
}





export async function updateEventApprovalStatus(_id, checked ){
  try{
    await connectMongoDB();
    const event1 = await Event.findOne({_id});
    event1.ap = checked;
    await event1.save();

  console.log("Event Approval Status Updated")
  }
  catch(error){
    console.log("Error updating approval status for the event");
    return {
      message:"Error updating the approval status for the image"
    };
  }
  revalidatePath("/dashboard/events");
};