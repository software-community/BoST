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
    <div className="w-full min-h-[60vh] pb-12 flex items-center flex-col justify-start">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 mb-12">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {monthName} {year} Schedule
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Click on a coloured cell to  see event details
          </p>
        </div>
      </div>
      <Calendar serializedEvents={JSON.stringify(fetchedEvents)} />
    </div>
  );
};

export default OurSchedule;
