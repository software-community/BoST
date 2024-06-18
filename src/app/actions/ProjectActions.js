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
  // members: z.array(z.string()).min(1, "Members are required."),
  // images: z.array(z.string()).min(1, "Images are required."),
  // relatedLinks: z.array(
  //   z.object({
  //     // title: z.string().min(1, "Title is required."),
  //     url: z.string().min(1, "URL is required."),
  //     icon: z.string().min(1, "Icon is required."), // We can do the favicon trick
  //   })
  // ),
  status: z.string().min(1, "Status is required."),
  club: z.string().min(1, "Club is required."),
});

export async function createProject(prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];
  // const _members = JSON.parse(formData.get("members")).map((item) => item.value);
  // const _relatedLinks = JSON.parse(formData.get("relatedLinks")).map((item) => {
  //   return {
  //     url: item.value,
  //     icon: "https://s2.googleusercontent.com/s2/favicons?domain_url=" + item.value
  //   }
  // });
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    // members: _members,
    // // images: formData.getAll("images"),
    // relatedLinks: _relatedLinks,
    status: formData.get("status"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create project.",
    };
  }

  // Extract validated data
  // const { title, description, members, images, relatedLinks, status, club } = validatedFields.data;
  const { title, description, status, club } = validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();
    await Project.create({ title, description, status, club });
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
  // const _members = JSON.parse(formData.get("members")).map((item) => item.value);
  // const _relatedLinks = JSON.parse(formData.get("relatedLinks")).map((item) => {
  //   return {
  //     url: item.value,
  //     icon: "https://s2.googleusercontent.com/s2/favicons?domain_url=" + item.value
  //   }
  // });

  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    // members: _members,
    // // images: formData.getAll("images"),
    // relatedLinks: _relatedLinks,
    status: formData.get("status"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors,)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update project.",
    };
  }

  // Extract validated data
  // const { title, description, members, images, relatedLinks, status, club } = validatedFields.data;
  const { title, description, status } = validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();
    await Project.findByIdAndUpdate(_id, { title, description, status });
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
