import connectMongoDB from "@/lib/db";
import Gallery from "@/models/Gallery";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllImages(club) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
   
    var gallery
    if(club==process.env.SUPER_ADMIN){
      gallery = await Gallery.find(); // Find the gallery for the specified club
    }else{
      gallery = await Gallery.find({ club }); // Find the gallery for the specified club
    }
    if (!gallery) return [];

    var images = [];
    for(var g of gallery){
      for(var img of g.images){
        images.push(img);
      }
    }

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
