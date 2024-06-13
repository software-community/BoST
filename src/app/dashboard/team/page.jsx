import React from "react";
import Table from "@/components/Team/table";

const page = async () => {
  const ColumnData = [
    "Team Member",
    "Email",
    "Club",
    "Position",
    "Edit / Delete",
  ];

  return (
    <div>
      <h1 className="text-left  text-2xl font-bold">Team Details </h1>
      <Table colData={ColumnData}  page="team"></Table>
    </div>
  );
};

export default page;
