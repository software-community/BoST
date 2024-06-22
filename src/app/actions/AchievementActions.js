"use server";

import { z } from "zod";
import connectMongoDB from "@/lib/db";
import getAchievementModel from "@/models/achievement";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const AchievementSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
});

// Server action to add an achievement
export async function addAchievement(prevState, formData) {
  const session = await auth();
  const club = session?.user.email.split("@")[0];

  const validatedFields = AchievementSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add achievement.",
    };
  }

  // Extract validated data
  const { title, description } = validatedFields.data;
  console.log("ye rha title ,desc", title, description);

  // Insert data into the database
  try {
    await connectMongoDB();
    const Achievement = getAchievementModel(); // Get the achievement model
    const achievement = await Achievement.findOne({ club });

    if (achievement) {
      achievement.text.push({ title, description });
      await achievement.save();
    } else {
      await Achievement.create({
        club,
        text: [{ title, description }],
      });
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log("error", error);
    return {
      message: "Database Error: Failed to add achievement.",
    };
  }

  // Revalidate the cache for the achievements page and redirect the user.
  revalidatePath("/dashboard/achievements");
  redirect("/dashboard/achievements");
}
export async function updateAchievement(prevState, formData) {
  // Get the user's session and club
  const session = await auth();
  const club = session?.user.email.split("@")[0];

  // Extract the achievement ID (assuming it's passed in formData)
  const achievementId = formData.get("id");

  // Extract the updated title and description from formData
  const updatedTitle = formData.get("title");
  const updatedDescription = formData.get("description");

  // Validate input data against AchievementSchema
  const validatedFields = AchievementSchema.safeParse({
    title: updatedTitle,
    description: updatedDescription,
  });

  // If validation fails, return error with validation messages
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Failed to update achievement.",
      status: 400,
    };
  }

  try {
    await connectMongoDB(); // Connect to the database

    // Find the achievement for the specified club
    const Achievement = getAchievementModel(); // Get the achievement model
    const achievement = await Achievement.findOne({ club });

    if (!achievement) {
      return {
        message: "Achievement not found for the club.",
        status: 404,
      };
    }

    // Find the achievement element with the specified ID
    const achievementElement = achievement.text.find((item) => item.id === achievementId);

    if (!achievementElement) {
      return {
        message: "Achievement element not found.",
        status: 404,
      };
    }

    // Update the title and description of the achievement element
    achievementElement.title = updatedTitle;
    achievementElement.description = updatedDescription;

    // Save the updated achievement
    await achievement.save();
  } catch (error) {
    console.error("Error updating achievement:", error);
    return {
      message: "Database Error: Failed to update achievement.",
      status: 500,
    };
  }

  // Revalidate the cache for the achievements page and redirect
  revalidatePath("/dashboard/achievements");
  redirect("/dashboard/achievements");
}


export async function deleteAchievementById(id) {
  const session = await auth();
  const club = session?.user.email.split("@")[0];

  // Connect to the database
  try {
    await connectMongoDB();
    const Achievement = getAchievementModel(); // Get the achievement model

    const achievement = await Achievement.findOne({ club });

    if (!achievement) {
      return {
        error: "achievement not found for the club",
        status: 404,
      };
    }

    const updatedAchievements = achievement.text.filter(
      (achievement) => achievement.id !== id
    );

    if (updatedAchievements.length === achievement.text.length) {
      return {
        error: "achievement not found",
        status: 404,
      };
    }

    achievement.text = updatedAchievements;
    await achievement.save();
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return {
      error: "An error occurred while deleting the image",
      status: 500,
    };
  }

  // Revalidate the cache for the images page
  revalidatePath("/achievements");

  return { message: "achievement deleted successfully" };
}
