"use client";
import Link from "next/link";
import { createTeamMember } from "@/app/actions/TeamActions";
import { useFormState } from "react-dom";
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTeamMember, initialState);
  const [avatarURL, setavatarURL] = useState("");
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("image", avatarURL); // Set the image URL in the form data

    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Add a member</h2>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Team Member Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            aria-describedby="name-error"
            placeholder="Enter name"
            className="peer px-4 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Position */}
        <div className="mb-4">
          <label htmlFor="position" className="mb-2 block text-sm font-medium">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            aria-describedby="position-error"
            placeholder="Enter position"
            className="peer px-4 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="position-error" aria-live="polite" aria-atomic="true">
            {state.errors?.position &&
              state.errors.position.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Image */}
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
              value={avatarURL} // Control the input field value with avatarURL state
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
                alert("Upload Completed");
                setavatarURL(res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Team Member Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            aria-describedby="email-error"
            placeholder="Enter email"
            className="peer px-4 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      <div className="mt-6 flex justify-end gap-2">
        <Link
          href="/dashboard/team"
          className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className=" text-white p-4 rounded-lg">Create</Button>
      </div>
      </div>

    </form>
  );
}
