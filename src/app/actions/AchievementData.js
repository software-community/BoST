import getAchievementModel from "@/models/achievement";
import connectMongoDB from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

export async function getAllAchievements(club) {
  noStore(); // Ensure no caching is done
  
  try {
    await connectMongoDB(); // Connect to the database
    const Achievement = getAchievementModel(); // Get the achievement model
    const achievement = await Achievement.findOne({ club }); // Find the achievement for the specified club
    if (!achievement) return []; // If no achievement found, return an empty array

    const achievements = achievement.text; // Get the array of achievements from the achievement document

    return achievements; // Return the fetched achievements
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return {
      error: "An error occurred while retrieving the achievements",
      status: 500,
    };
  }
}

export async function getAchievementById(club, achievementId) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database

    const Achievement = getAchievementModel(); // Get the achievement model
    const achievement = await Achievement.findOne({ club });

    if (!achievement) {
      return {
        error: "Achievement not found for the club",
        status: 404,
      };
    }

    // Find the achievement with the specified ID
    const foundAchievement = achievement.text.find(
      (ach) => ach._id.toString() === achievementId
    );

    if (!foundAchievement) {
      return {
        error: "Achievement not found",
        status: 404,
      };
    }

    return foundAchievement; // Return the found achievement
  } catch (error) {
    console.error("Error fetching achievement:", error);
    return {
      error: "An error occurred while retrieving the achievement",
      status: 500,
    };
  }
}