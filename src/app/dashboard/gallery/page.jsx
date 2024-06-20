import React from "react";
import Table from "@/components/Gallery/table";

const page = async () => {
  const ColumnData = [
    "preview",
    "Image-Id",
    "Club",
    "Delete",
  ];

  return (
    <div>
      <h1 className="text-left  text-2xl font-bold text-primary">Gallery details </h1>
      <Table colData={ColumnData} page="gallery"></Table>
    </div>
  );
};

export default page;
