"use server";
import { z } from "zod";
import connectMongoDB from "@/lib/db";
import Gallery from "@/models/Gallery";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs
import { clubCodes } from "@/lib/utils";

const ImageSchema = z.object({
  image: z.string().min(1, "Image is required."),
});

// Server action to add an image
export async function addImage(prevState, formData) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  const validatedFields = ImageSchema.safeParse({
    image: formData.get("image"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to add image.",
    };
  }

  // Extract validated data
  const { image } = validatedFields.data;
  const imageObject = {
    name: uuidv4(), // Generate a random unique ID for the image
    url: image,
  };

  // Insert data into the database
  try {
    await connectMongoDB();
    const gallery = await Gallery.findOne({ club });

    if (gallery) {
      gallery.images.push(imageObject);
      await gallery.save();
    } else {
      await Gallery.create({
        club,
        images: [imageObject],
      });
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to add image.",
    };
  }

  // Revalidate the cache for the images page and redirect the user.
  revalidatePath("/dashboard/gallery");
  redirect("/dashboard/gallery");
}

export async function updateGalleryImageURL(prevState, formData) {
  // Get the user's session and club
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];
 

  // Extract the image name (UUID) and new URL from form data
  const name = formData.get("name");
  const newUrl = formData.get("url");

  if (!newUrl) {
    return {
      message: "new URL is required.",
      status: 400,
    };
  }

  try {
    await connectMongoDB(); // Connect to the database
    // Find the gallery for the specified club
    const gallery = await Gallery.findOne({ club });

    if (!gallery) {
      return {
        message: "Gallery not found for the club.",
        status: 404,
      };
    }

    // Find the image with the specified name (UUID)
    const imageIndex = gallery.images.findIndex((img) => img.name === name);

    if (imageIndex === -1) {
      return {
        message: "Image not found.",
        status: 404,
      };
    }

    // Update the image URL
    gallery.images[imageIndex].url = newUrl;

    // Save the updated gallery
    await gallery.save();
  } catch (error) {
    console.error("Error updating image:", error);
    return {
      message: "Database Error: Failed to update image.",
      status: 500,
    };
  }

  revalidatePath("/dashboard/gallery");
  redirect("/dashboard/gallery");
}

export async function deleteImageByName(imageName) {
  const session = await auth();
  const club = clubCodes[session?.user.email.split("@")[0]];

  // Connect to the database
  try {
    await connectMongoDB();
    const gallery = await Gallery.findOne({ club });

    if (!gallery) {
      return {
        error: "Gallery not found for the club",
        status: 404,
      };
    }

    // Filter out the image with the specified name (UUID)
    const updatedImages = gallery.images.filter(
      (image) => image.name !== imageName
    );

    // If the image to delete was not found
    if (updatedImages.length === gallery.images.length) {
      return {
        error: "Image not found",
        status: 404,
      };
    }

    gallery.images = updatedImages;
    await gallery.save();
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      error: "An error occurred while deleting the image",
      status: 500,
    };
  }

  // Revalidate the cache for the images page
  revalidatePath("/gallery");

  return { message: "Image deleted successfully" };
}
