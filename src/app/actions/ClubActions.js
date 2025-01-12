"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import ClubData from "@/models/clubData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

const FormSchema = z.object({
  club: z.string().min(1, "Club is required."),
  name: z.string().min(1, "Club Name is required."),
  introduction: z.string().min(1, "Club Introduction is required."),
  logo: z.string().min(1, "Club Logo is required."),
});

// Here this _id is passed through binding and not directly as it is a sensitive information that may be used mischievously
export async function updateClubData(prevState, formData) {
  const session = await auth();
  const _club = clubCodes[session?.user.email.split("@")[0]];
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    introduction: formData.get("introduction"),
    logo: formData.get("logo"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update club data.",
    };
  }

  // Extract validated data
  const { name, introduction, logo, club } = validatedFields.data;
  

  // Insert data into the database
  try {
    await connectMongoDB();
    await ClubData.findOneAndUpdate({
      club
    }, {
      name,
      introduction,
      logo,
    });
    return {
      success: true,
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update club data.",
    };
  }

  // Revalidate the cache for the club data page and redirect the user.
  revalidatePath("/dashboard/club");
  redirect("/dashboard/club");
}
