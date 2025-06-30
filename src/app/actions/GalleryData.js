"use server"
import connectMongoDB from "@/lib/db";
import Gallery from "@/models/Gallery";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";

export async function getAllImages(userClub) {
  noStore(); // Ensure no caching is done

  try {
    await connectMongoDB(); // Connect to the database
   
    var galleries;
    if(userClub==process.env.SUPER_ADMIN){
      galleries = await Gallery.find(); // Find the gallery for the specified club
      // For each gallery, update order and save if needed
      for (const gallery of galleries) {
        let updated = false;
        if (gallery.images && gallery.images.length > 0) {
          gallery.images.forEach((img, idx) => {
            if (img.order !== idx + 1) {
              img.order = idx + 1;
              updated = true;
            }
          });
          if (updated) {
            await gallery.save();
          }
        }
      }
    }else{
      galleries = await Gallery.find({ club: userClub });
      for (const gallery of galleries) {
        let updated = false;
        if (gallery.images && gallery.images.length > 0) {
          gallery.images.sort((a, b) => a.order - b.order);
          gallery.images.forEach((img, idx) => {
            if (img.order !== idx + 1) {
              img.order = idx + 1;
              updated = true;
            }
          });
          if (updated) {
            await gallery.save();
          }
        }
      }
    }
    if (!galleries || galleries.length === 0) return [];

    var images = [];
    for(var g of galleries){
      for(var img of g.images){
        images.push({...img.toObject(), club: g.club});
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





export async function moveImageUp(imageName, club) {
  // "use server"
  try {
    await connectMongoDB();
    const gallery = await Gallery.findOne({ club });
    
    if (!gallery || !gallery.images || gallery.images.length === 0) {
      return { message: "Gallery not found or no images" };
    }

    // Sort images by order
    gallery.images.sort((a, b) => a.order - b.order);
    
    const currentIndex = gallery.images.findIndex(img => img.name === imageName);
    
    if (currentIndex > 0) {
      // Swap order values
      const temp = gallery.images[currentIndex].order;
      gallery.images[currentIndex].order = gallery.images[currentIndex - 1].order;
      gallery.images[currentIndex - 1].order = temp;
      
      // Save the updated gallery
      await gallery.save();
    }
  } catch (error) {
    return { message: "Failed to move image up" };
  }
  revalidatePath("/dashboard/gallery");
}

export async function moveImageDown(imageName, club) {
  // "use server"
  try {
    await connectMongoDB();
    const gallery = await Gallery.findOne({ club });
    
    if (!gallery || !gallery.images || gallery.images.length === 0) {
      return { message: "Gallery not found or no images" };
    }

    // Sort images by order
    gallery.images.sort((a, b) => a.order - b.order);
    
    const currentIndex = gallery.images.findIndex(img => img.name === imageName);
    
    if (currentIndex < gallery.images.length - 1) {
      // Swap order values
      const temp = gallery.images[currentIndex].order;
      gallery.images[currentIndex].order = gallery.images[currentIndex + 1].order;
      gallery.images[currentIndex + 1].order = temp;
      
      // Save the updated gallery
      await gallery.save();
    }
  } catch (error) {
    return { message: "Failed to move image down" };
  }
  revalidatePath("/dashboard/gallery");
}