"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createProject } from "@/app/actions/ProjectActions";
import { generateUploadButton } from "@uploadthing/react";
const UploadButton = generateUploadButton({
  url: "/bost/api/uploadthing"
})

const developmentStatus = [
  { id: 1, name: "Not Started" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

const Form = () => {
  // const { register, handleSubmit, control } = useForm({
  //   defaultValues: {
  //     repoLinks: [{ value: "" }],
  //     teamMembers: [{ value: "" }],
  //   },
  // });

  const initialState = {
    repoLinks: [""],
    teamMembers: [""],
  };
  const [state, dispatch] = useFormState(createProject, initialState);
  const [projectImageURL, setProjectImageURL] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("image", projectImageURL);
    dispatch(formData);
  };

  return (
    <form onSubmit={onSubmit}>
       <div className="text-xl font-bold text-primary mb-4">
        <h2>Create a Project</h2>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter title"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter description"
            rows="3"
            aria-describedby="description-error"
          ></textarea>
          {state.errors?.description &&
            state.errors.description.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        <div className="mb-4">
          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="status-error"
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {state.errors?.status &&
              state.errors.status.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
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
              placeholder="Upload project image"
              value={projectImageURL} // Control the input field value with avatarURL state
              className="peer px-4 block w-full md:w-1/2 h-8 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              readOnly
            />
            <UploadButton
              endpoint="imageUploader"
              className="ut-uploading:pointer-events-none"
              appearance={{
                container: "w-1/4",
button:"bg-primary"
              }}
              onClientUploadComplete={(res) => {
                alert("Upload Completed");
                setProjectImageURL(res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <p className="text-gray-500 text-sm mt-8">A good resolution image with similar orientation as others is prefferred</p>
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
        <div className="mb-4">
          <label htmlFor="github" className="mb-2 block text-sm font-medium">
            GitHub
          </label>
          <input
            id="github"
            name="github"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter GitHub link (optional)"
            // aria-describedby="github-error"
          />
          {/* <div id="github-error" aria-live="polite" aria-atomic="true">
            {state.errors?.github &&
              state.errors.github.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        <div className="mb-4">
          <label htmlFor="website" className="mb-2 block text-sm font-medium">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter website link (optional)"
            // aria-describedby="website-error"
          />
          {/* <div id="website-error" aria-live="polite" aria-atomic="true">
            {state.errors?.website &&
              state.errors.website.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        <div className="mb-4">
          <label htmlFor="members" className="mb-2 block text-sm font-medium">
            Members
          </label>
          <input
            type="text"
            id="members"
            name="members"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter members (comma-separated)"
            aria-describedby="members-error"
          />
          <div id="members-error" aria-live="polite" aria-atomic="true">
            {state.errors?.members &&
              state.errors.members.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/projects"
            className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" >Create Project</Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
