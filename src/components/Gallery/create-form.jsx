"use client";
import Link from "next/link";
import { addImage } from "@/app/actions/GalleryActions"; // Assume this is your server action
import { useFormState } from "react-dom";
import UploadButton from "@/components/UploadButton";
import { useState } from "react";

export default function AddImageForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addImage, initialState);
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("image", imageURL); // Set the image URL in the form data
    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Add an Image</h2>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <div className="w-full flex flex-col md:flex-row max-w-[900px] gap-8 items-center">
            <input
              id="image"
              name="image"
              type="text"
              aria-describedby="image-error"
              placeholder="Upload your image"
              value={imageURL} // Control the input field value with imageURL state
              className="peer px-4 block w-full md:w-1/2 h-8 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              readOnly
            />
            <UploadButton
              endpoint="imageUploader"
              className="ut-uploading:pointer-events-none"
              appearance={{
                container: "w-1/4",
                button: "bg-primary",
              }}
              onClientUploadComplete={(res) => {
                alert("Upload Completed");
                setImageURL(res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />

          </div>
          <p className="text-gray-500 text-sm mt-8">A smaller resolution image around 200kbs is preferred as it is a part of gallery.</p>
          <p className="text-gray-500 text-sm mb-8 mt-4"> ProTip: Try to keep total images a multiple of 3 or 2. </p>
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/gallery"
            className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button type="submit" className="bg-primary text-white p-2 rounded-lg">
            Add Image
          </button>
        </div>
      </div>

      {/*Preview Section BELOW the form */}
      <div className="mt-8 flex justify-center min-h-[300px]">
        {imageURL ? (
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <img
              src={imageURL}
              alt="Uploaded preview"
              className="w-full h-72 object-cover object-center rounded-md border"
            />
          </div>
        ) : (
          // Reserve space to prevent layout shift
          <div className="w-full sm:w-1/2 lg:w-1/3 h-72 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">
            Image preview will appear here
          </div>
        )}
      </div>

    </form>
  );
}
