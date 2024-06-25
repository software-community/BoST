"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import Blog from "@/models/blog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  brief: z.string().min(1, "Brief is required.").max(100,"Brief is too Long, keep it below 100 characters"),
  content: z.string().min(1, "Content is required."),
  author: z.string().min(1, "Author is required."),
  club: z.string().min(1, "Club is required."),
});

export async function createBlog(prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    brief: formData.get("brief"),
    content: formData.get("content"),
    author: formData.get("author"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
  
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create blog.",
    };
  }

  // Extract validated data
  const { title, brief, content, author, club } = validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();
    await Blog.create({ title, brief, content, author, club });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to create blog.",
    };
  }

  // Revalidate the cache for the blogs page and redirect the user.
  revalidatePath("/dashboard/blogs");
  redirect("/dashboard/blogs");
}

// here this _id is passed through binding and not directly as it is a sensitive information that may be used mischeviously
export async function updateBlog(_id, prevState, formData) {
  const session = await auth();
  const _club = session?.user.email.split("@")[0];
  // Validate form using Zod
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    brief: formData.get("brief"),
    content: formData.get("content"),
    author: formData.get("author"),
    club: _club,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update blog.",
    };
  }

  // Extract validated data
  const { title, brief, content, author } = validatedFields.data;

  // Insert data into the database
  try {
    await connectMongoDB();
    await Blog.findByIdAndUpdate(_id, { title, brief, content, author });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update blog.",
    };
  }

  // Revalidate the cache for the blogs page and redirect the user.
  revalidatePath("/dashboard/blogs");
  redirect("/dashboard/blogs");
}

export async function deleteBlog(id) {
  // Connect to the database
  try {
    await connectMongoDB();

    // Attempt to delete the blog by their ID
    const result = await Blog.findByIdAndDelete(id);

    // Check if the blog was not found
    if (!result) {
      return {
        message: "Blog not found.",
      };
    }
  } catch (error) {
    // If a database error occurs, return a more specific error
    return {
      message: "Database Error: Failed to delete blog.",
    };
  }

  // Revalidate the cache for the blogs page and redirect the user
  revalidatePath("/dashboard/blogs");
}
