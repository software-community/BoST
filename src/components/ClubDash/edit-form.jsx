"use client";
import Link from "next/link";
import { updateClubData } from "@/app/actions/ClubActions";
import { useFormState } from "react-dom";
import { UploadButton } from "@uploadthing/react";
import { useEffect, useState } from "react";

export default function Form({ clubData }) {
  const initialState = { message: null, errors: {} };
  const [logoURL, setLogoURL] = useState(clubData.logo || "");
  const [state, dispatch] = useFormState(updateClubData, initialState);
  const errors = state?.errors || {}; // Ensure errors is always an object
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    formData.set("logo", logoURL); // Set the image URL in the form data
    dispatch(formData); // Dispatch the form data to the reducer
  };

  useEffect(() => {
    if (state?.success) {
      alert("Success!");
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Edit Club details</h2>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Club Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={clubData?.name}
            aria-describedby="name-error"
            placeholder="Enter Club name"
            className="peer px-2 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              errors.name.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Club Introduction */}
        <div className="mb-4">
          <label htmlFor="introduction" className="mb-2 block text-sm font-medium">
            Introduction
          </label>
          <input
            id="introduction"
            name="introduction"
            defaultValue={clubData?.introduction}
            type="text"
            aria-describedby="introduction-error"
            placeholder="Introduce your club..."
            className="peer px-2 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="introduction-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.introduction &&
              errors.introduction.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Club Logo */}
        <div className="mb-4">
          <label htmlFor="logo" className="mb-2 block text-sm font-medium">
            Logo URL
          </label>
          <div className="w-full flex flex-col md:flex-row max-w-[900px] gap-8 items-center">
            <input
              id="logo"
              name="logo"
              type="text"
              aria-describedby="logo-error"
              placeholder="Upload your logo"
              value={logoURL} // Control the input field value with logoURL state
              className="peer px-4 block w-full md:w-1/2 h-8 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              readOnly
            />
            <UploadButton
              endpoint="imageUploader"
              className="ut-uploading:pointer-events-none"
              appearance={{
                container: "w-1/4",
button:"bg-primary"              }}
              onClientUploadComplete={(res) => {
                setLogoURL(res[0].url);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <div id="logo-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.logo &&
              errors.logo.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="submit" className="bg-primary text-white px-4 p-2 rounded-lg">Save</button>
        </div>
      </div>

    </form>
  );
}
