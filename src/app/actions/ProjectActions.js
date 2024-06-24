"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import Project from "@/models/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  members: z.string().min(1, "members are required."),
  image: z.string().min(1, "Image is required."),
  status: z.string().min(1, "Status is required."),
  club: z.string().min(1, "Club is required."),
  github: z.string(),
  website: z.string(),
});

export async function createProject(prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];

  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    members: formData.get("members"),
    image: formData.get("image"),
    status: formData.get("status"),
    club: _club,
    github: formData.get("github"),
    website: formData.get("website"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create project.",
    };
  }

  // Extract validated data
  const { title, description, status, club, members, image, github, website } =
    validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();
    await Project.create({
      title,
      description,
      status,
      club,
      members,
      image,
      github,
      website,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to create project.",
    };
  }

  // Revalidate the cache for the projects page and redirect the user.
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

// here this _id is passed through binding and not directly as it is a sensitive information that may be used mischeviously
export async function updateProject(_id, prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];
  

  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    members: formData.get("members"),
    image: formData.get("image"),
    github: formData.get("github"),
    website: formData.get("website"),
    status: formData.get("status"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update project.",
    };
  }

  // Extract validated data
  // const { title, description, members, images, relatedLinks, status, club } = validatedFields.data;
  const { title, description, status, members, image, github, website } =
    validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();

    await Project.findByIdAndUpdate(_id, {
      title,
      description,
      status,
      members,
      image,
      github,
      website,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update project.",
    };
  }

  // Revalidate the cache for the projects page and redirect the user.
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(id) {
  // Connect to the database
  try {
    await connectMongoDB();

    // Attempt to delete the project by their ID
    const result = await Project.findByIdAndDelete(id);

    // Check if the project was not found
    if (!result) {
      return {
        message: "Project not found.",
      };
    }
  } catch (error) {
    // If a database error occurs, return a more specific error
    return {
      message: "Database Error: Failed to delete project.",
    };
  }

  // Revalidate the cache for the projects page and redirect the user
  revalidatePath("/dashboard/projects");
}
