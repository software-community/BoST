import React from "react";
import Table from "@/components/Gallery/table";

const page = async () => {
  const ColumnData = [
    "preview",
    "Image-Id",
    "Club",
    "Delete",
    "Reorder"
  ];

  return (
    <div>
      <h1 className="text-left text-2xl font-bold text-black">Gallery Details</h1>
      <Table colData={ColumnData} page="gallery"></Table>
    </div>
  );
};

export default page;
