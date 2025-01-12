import connectMongoDB from "@/lib/db";
import ClubData from "@/models/clubData";
import { unstable_noStore as noStore } from "next/cache";


export async function getClubDetails(club) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    const clubdata = await ClubData.findOne({ club }); // Fetch club data

    return clubdata; // Return the fetched club data
  } catch (error) {
    console.error("Error fetching club data:", error);
    return {
      error: "An error occurred while retrieving the club data",
      status: 500,
    };
  }
}
