import React from "react";
import Table from "@/components/Events/table";

const page = async () => {
  const ColumnData = [
    "Preview",
    "Event",
    "Venue",
    "Club",
    "Date",
    "Time",
    "Edit / Delete",
  ];

  return (
    <div>
      <h1 className="text-left  text-2xl font-bold text-primary">Event Details </h1>
      <Table colData={ColumnData} page="team"></Table>
    </div>
  );
};

export default page;
