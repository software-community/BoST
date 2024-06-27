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

export function EventDetailDialog({ Date, open, onOpenChange, event }) {
  const [eventDetails, setEventDetails] = useState(event);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full text-2xl mb-4 text-center">{event.title}</AlertDialogTitle>
          <div className="w-full flex flex-col gap-2 text-lg">
            <p><strong className="mr-2">About:</strong> {event.about}</p>
            <p><strong className="mr-2"> Venue:</strong> {event.venue}</p>
            <p><strong className="mr-2">Time:</strong> {event.time}</p>

          </div>
      

          <AlertDialogFooter className="flex flex-col gap-2 ">
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
