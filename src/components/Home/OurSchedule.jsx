import React from "react";
import { getEventsForClub } from "@/app/actions/EventData";
import Calendar from "../ui/MonthCalendar";

const OurSchedule = async () => {
  const fetchedEvents = await getEventsForClub(process.env.SUPER_ADMIN);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().getMonth(); // Call the function to get the month
  const year = new Date().getFullYear();
  const monthName = monthNames[month];
  return (
    <div className="w-full min-h-[50vh] pb-12 flex items-center flex-col justify-center">
      <h1 className="w-full text-center text-3xl mb-8 font-bold">
          {monthName} {year} Schedule
        </h1>
      <Calendar serializedEvents={JSON.stringify(fetchedEvents)}/>
    </div>
  );
};

export default OurSchedule;
