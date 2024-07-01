"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFormState } from "react-dom";
import { updateEvent, deleteEventByDate } from "@/app/actions/EventActions"; // Assume you have an action to create an event

export function ViewUpdateEventModal({
  Date,
  open,
  onOpenChange,
  event,
  club,
}) {
  const initialState = { message: null, errors: {} };
  const [eventDetails, setEventDetails] = useState(event);
  const [state, dispatch] = useFormState(updateEvent, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("date", Date); // Set the date in the form data
    console.log("about to dispatch");
    dispatch(formData);
  };

  const handleDelete = async () => {
    try {
      await deleteEventByDate(Date);
      onOpenChange(false); // Close the modal after deletion
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Event</AlertDialogTitle>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="mb-2 w-full text-left block text-sm font-medium"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={eventDetails.title}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter title"
                aria-describedby="title-error"
              />
              <div id="title-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.title &&
                  state.errors.title.map((error) => (
                    <p
                      className="mt-2 text-sm w-full text-left text-red-500"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-4">
              <label
                htmlFor="about"
                className="mb-2 w-full text-left  block text-sm font-medium"
              >
                About
              </label>
              <input
                id="about"
                name="about"
                type="text"
                defaultValue={eventDetails.about}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="What is the event about?"
                aria-describedby="about-error"
              />
              <div id="about-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.about &&
                  state.errors.about.map((error) => (
                    <p
                      className="mt-2 text-sm w-full text-left text-red-500"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label
                htmlFor="venue"
                className="mb-2 w-full text-left  block text-sm font-medium"
              >
                Venue
              </label>
              <input
                id="venue"
                name="venue"
                defaultValue={eventDetails.venue}
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter venue"
                aria-describedby="venue-error"
              />
              <div id="venue-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.venue &&
                  state.errors.venue.map((error) => (
                    <p
                      className="mt-2 text-sm w-full text-left text-red-500"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* Time */}
            <div className="mb-4">
              <label
                htmlFor="time"
                className="mb-2 w-full text-left  block text-sm font-medium"
              >
                Time
              </label>
              <input
                id="time"
                name="time"
                defaultValue={eventDetails.time}
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter time"
                aria-describedby="time-error"
              />
              <div id="time-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.time &&
                  state.errors.time.map((error) => (
                    <p
                      className="mt-2 text-sm w-full text-left text-red-500"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <AlertDialogFooter className="flex flex-col gap-2 flex-col-reverse">
              <AlertDialogCancel>Close</AlertDialogCancel>
              <button
                type="button"
                onClick={handleDelete}
                className=" bg-red-500 text-white p-2   rounded-md"
              >
                Delete Event
              </button>
              <button
                type="submit"
                className="bg-primary  text-white p-2 rounded-md"
              >
                Update Event
              </button>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
