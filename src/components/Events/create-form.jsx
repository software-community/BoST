"use client";
import Link from "next/link";
import { addEvent } from "@/app/actions/EventActions";
import { useFormState } from "react-dom";
import UploadButton from "@/components/UploadButton";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addEvent, initialState);
  const [avatarURL, setavatarURL] = useState("");
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("image", avatarURL); // Set the image URL in the form data

    // console.log('=== Form Data Entries ===');
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    // console.log('=== Form Data Entries ===');
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);}

    dispatch(formData);

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Add an Event</h2>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Event Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Event
          </label>
          <input
            id="event"
            name="event"
            type="text"
            aria-describedby="event-error"
            placeholder="Enter Event"
            className="peer px-4 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          {/* <div id="event-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label htmlFor="desc" className="mb-2 block text-sm font-medium">
            Event Description
          </label>
          <input
            id="desc"
            name="desc"
            type="text"
            aria-describedby="desc-error"
            placeholder="Enter description"
            className="peer px-4 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          {/* <div id="desc-error" aria-live="polite" aria-atomic="true">
            {state.errors?.position &&
              state.errors.position.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Event Image */}
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
              placeholder="Upload Event image"
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
          {/* <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        
        {/* Event Date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            aria-describedby="date-error"
            placeholder="Enter date"
            className="peer px-4 block min-w-[10vw] rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          {/* <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.position &&
              state.errors.position.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

            {/* Event Time */}
            <div className="mb-4">
          <label htmlFor="time" className="mb-2 block text-sm font-medium">
            Event Time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            aria-describedby="time-error"
            placeholder="Enter Time"
            className="peer px-4 block min-w-[10vw] rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          {/* <div id="time-error" aria-live="polite" aria-atomic="true">
            {state.errors?.position &&
              state.errors.position.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

            {/* Event Venue*/}
            <div className="mb-4">
          <label htmlFor="venue" className="mb-2 block text-sm font-medium">
            Event Venue
          </label>
          <input
            id="venue"
            name="venue"
            type="text"
            aria-describedby="venue-error"
            placeholder="Enter Venue"
            className="peer px-4 block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
          {/* <div id="venue-error" aria-live="polite" aria-atomic="true">
            {state.errors?.position &&
              state.errors.position.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>


   
      <div className="mt-6 flex justify-end gap-2">
        <Link
          href="/dashboard/events"
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
