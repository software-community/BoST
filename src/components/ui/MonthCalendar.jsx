"use client";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// import { CreateEventModal } from "./create-modal";
import { EventDetailDialog } from "./EventDetailDialog";

function CustomDayContent({ date, eventDates }) {
  const isEventDay = eventDates.includes(date.getDate());
  return (
    <span style={{ position: "relative", overflow: "visible" }}>
      {isEventDay ? (
        <div>
          <span className="bg-primary text-white p-1 ">{date.getDate()}</span>
        </div>
      ) : (
        date.getDate()
      )}
    </span>
  );
}

function CustomCaptionComponent(props) {
  return null;
}

export default function Calendar({ serializedEvents }) {
  const [open, setOpen] = useState(false);
  const [eventDaySelected, setEventDaySelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const events = JSON.parse(serializedEvents);
  const eventDates = events.map((e) => e.date);
  useEffect(() => {
    setOpen(false);
  }, [serializedEvents]);

  const handleDayClick = (day) => {
    const dayNumber = day.getDate();
    setSelectedDate(dayNumber);
    const isEventDay = eventDates.includes(dayNumber);

    if (isEventDay) {
      setEventDaySelected(true);
      const eventObj = events.find((e) => e.date === dayNumber);
      setSelectedEvent(eventObj);
    } else {
      setEventDaySelected(false);
      setSelectedEvent(null);
    }
    setOpen(true);
  };

  return (
    <>
      <DayPicker
        onDayClick={handleDayClick}
        components={{
          DayContent: (props) => (
            <CustomDayContent {...props} eventDates={eventDates} />
          ),
          Caption: CustomCaptionComponent,
        }}
        className="text-lg sm:text-xl"
      />
      {eventDaySelected && open && (
        <EventDetailDialog
          Date={selectedDate}
          event={selectedEvent}
          open={open}
          onOpenChange={setOpen}
        />
      )}
     
    </>
  );
}
