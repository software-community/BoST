'use client';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const events = [
  { date: 19, title: 'Title 19', about: 'About the event on 19th', venue: 'Venue 19' },
  { date: 25, title: 'Title 25', about: 'About the event on 25th', venue: 'Venue 25' },
  // Add more events as needed
];

/** Replace the 19th with an emoji */
function CustomDayContent(props) {
  const event = events.find((event) => event.date === props.date.getDate());
  return (
    <span style={{ position: 'relative', overflow: 'visible' }}>
      {event ? (
        <div>
          <span className="bg-primary text-white p-1 ">{event.date}</span>
        </div>
      ) : (
        props.date.getDate()
      )}
    </span>
  );
}
function CustomCaptionComponent(props) {
  return null;
}

export function MonthCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDayClick = (day) => {
    const dayNumber = day.getDate(); 
    const event = events.find((event) => event.date === dayNumber);
    if (event) {
      setSelectedEvent(event);
      setOpen(true);
    } else {
      setSelectedEvent(null);
      setOpen(false);
    }
  };

  return (
    <>
      <DayPicker
        onDayClick={handleDayClick}
        components={{
          DayContent: CustomDayContent,
          Caption: CustomCaptionComponent,
        }}
        className="text-sm"
      />
      {selectedEvent && (
        <AlertDialogDemo event={selectedEvent} open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}

export function AlertDialogDemo({ event, open, onOpenChange }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{event.title}</AlertDialogTitle>
          <AlertDialogDescription>
            <p><strong>About:</strong> {event.about}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
