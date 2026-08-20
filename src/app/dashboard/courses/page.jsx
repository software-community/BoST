import React from 'react'
import Table from '@/components/Course/table';

let columnData = ["Image Preview", "Title", "Description", "Duration", "Club", "Edit/Delete","Modules"];

const page = () => {
  return (
    <div>
      <h1 className="text-left text-2xl font-bold text-black">Course Details</h1>
        <Table colData={columnData} page="courses"></Table>
    </div>
  )
}

export default page