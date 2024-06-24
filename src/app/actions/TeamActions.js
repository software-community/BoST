"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import TeamMember from "@/models/teamMember";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  position: z.string().min(1, "Position is required."),
  image: z.string().min(1, "Image URL is required."),
  email: z.string().email("Invalid email format."),
  club: z.string().min(1, "Club is required."),
});

export async function createTeamMember(prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    position: formData.get("position"),
    image: formData.get("image"),
    email: formData.get("email"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create team member.",
    };
  }

  // Extract validated data
  const { name, position, image, email, club } = validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();
    await TeamMember.create({ name, position, image, email, club });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: "Database Error: Failed to create team member.",
    };
  }

  // Revalidate the cache for the team members page and redirect the user.
  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}

// Here this _id is passed through binding and not directly as it is a sensitive information that may be used mischievously
export async function updateTeamMember(_id, prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    position: formData.get("position"),
    image: formData.get("image"),
    email: formData.get("email"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update team member.",
    };
  }

  // Extract validated data
  const { name, position, image, email } = validatedFields.data;
  

  // Insert data into the database
  try {
    await connectMongoDB();
    await TeamMember.findByIdAndUpdate(_id, {
      name,
      position,
      image,
      email,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update team member.",
    };
  }

  // Revalidate the cache for the team members page and redirect the user.
  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}

export async function deleteTeamMember(id) {
  // Connect to the database
  try {
    await connectMongoDB();

    // Attempt to delete the team member by their ID
    const result = await TeamMember.findByIdAndDelete(id);

    // Check if the team member was not found
    if (!result) {
      return {
        message: "Team member not found.",
      };
    }
  } catch (error) {
    // If a database error occurs, return a more specific error
    return {
      message: "Database Error: Failed to delete team member.",
    };
  }

  // Revalidate the cache for the team members page and redirect the user
  revalidatePath("/dashboard/team");
}
