"use client"
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFormState } from "react-dom";
import { addEvent } from "@/app/actions/EventActions"; // Assume you have an action to create an event

export function CreateEventModal({ Date, open, onOpenChange }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addEvent, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("date", Date); // Set the date in the form data
    dispatch(formData);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Event on {Date}</AlertDialogTitle>

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

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <button type="submit" className="bg-primary text-white p-2">Create Event</button>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
