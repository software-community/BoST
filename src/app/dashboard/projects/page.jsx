import React from 'react'
import Table from '@/components/Project/table';

let columnData = ["Image Preview", "Title", "Description", "Status", "Club", "Approval", "Edit/Delete"];

const page = () => {
  return (
    <div>
      <h1 className="text-left  text-2xl font-bold text-primary">Project Details </h1>
      <Table colData={columnData} page="projects"></Table>
    </div>
  )
}

export default page