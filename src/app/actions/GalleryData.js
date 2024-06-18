import Gallery from "@/models/Gallery";
import connectMongoDB from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllImages(club) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    const gallery = await Gallery.findOne({ club }); // Find the gallery for the specified club
    if (!gallery) return [];

    const images = gallery.images; // Get the array of images from the gallery

    return images; // Return the fetched images
  } catch (error) {
    console.error("Error fetching images:", error);
    return {
      error: "An error occurred while retrieving the images",
      status: 500,
    };
  }
}

export async function getImageByName(club, imageName) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
    const gallery = await Gallery.findOne({ club }); // Find the gallery for the specified club

    if (!gallery) {
      return {
        error: "Gallery not found for the club",
        status: 404,
      };
    }

    // Find the image with the specified name (UUID)
    const image = gallery.images.find((img) => img.name === imageName);

    if (!image) {
      return {
        error: "Image not found",
        status: 404,
      };
    }

    return image; // Return the found image
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      error: "An error occurred while retrieving the image",
      status: 500,
    };
  }
}
