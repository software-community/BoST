import React from "react";
import { MonthCalendar } from "@/components/Calendar";

const Page = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = new Date().getMonth(); // Call the function to get the month
  const year= new Date().getFullYear()
  const monthName = monthNames[month];

  return (
    <>
      <h1 className="w-full pl-6">{monthName} {year} Calendar</h1>
      <MonthCalendar />
    </>
  );
};

export default Page;
