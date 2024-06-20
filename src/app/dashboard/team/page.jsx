import React from "react";
import Table from "@/components/Team/table";

const page = async () => {
  const ColumnData = [
    "Preview",
    "Name",
    "Email",
    "Club",
    "Position",
    "Edit / Delete",
  ];

  return (
    <div>
      <h1 className="text-left  text-2xl font-bold text-primary">Team Details </h1>
      <Table colData={ColumnData} page="team"></Table>
    </div>
  );
};

export default page;
