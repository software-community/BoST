"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import Project from "@/models/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

const MemberSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email."),
  image: z.string().min(1),
  github: z.string().url("Invalid GitHub URL.").or(z.literal("")).optional(),
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL.")
    .or(z.literal(""))
    .optional(),
});

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  members: z
    .string()
    .min(1, "Members are required.")
    .transform((value) => JSON.parse(value)) // transform string input to JSON
    .pipe(z.array(MemberSchema)), // validate each member
  image: z.string().min(1, "Image is required."),
  status: z.string().min(1, "Status is required."),
  club: z.string().min(1, "Club is required."),
  github: z.string(),
  website: z.string(),
});

export async function createProject(formData) {
  const session = await auth();
  const _club = clubCodes[session?.user.email.split("@")[0]];

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
export async function updateProject(_id, formData) {
  const session = await auth();
  const _club = clubCodes[session?.user.email.split("@")[0]];

  // console.log("🧾 Raw formData (members):", formData.get("members"));


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
      // console.log("❌ Zod validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update project.",
    };
  }

  // Extract validated data
  // const { title, description, members, images, relatedLinks, status, club } = validatedFields.data;
  const { title, description, status, members, image, github, website } =
    validatedFields.data;
    // console.log("🛠️ Parsed members inside updateProject:", members);


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
  return { success: true };
  // console.log("Project created successfully");
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

export async function updateProjectApprovalStatus(projectId, approved) {
  console.log("Attempting to update project approval status...");
  console.log("Received values:", { projectId, approved });
  try {
    await connectMongoDB();
    console.log("Database connected.");
    const result = await Project.findByIdAndUpdate(projectId, { approved });
    console.log("findByIdAndUpdate result:", result);

    if (!result) {
      console.error("Project not found with ID:", projectId);
      return {
        error: "Project not found",
        status: 404,
      };
    }
  } catch (error) {
    console.error("Error updating project approval status:", error);
    return {
      error: "An error occurred while updating the project approval status",
      status: 500,
    };
  }

  revalidatePath("/dashboard/projects");
  console.log("Revalidated path and finished update.");
  return { message: "Project approval status updated successfully" };
}
