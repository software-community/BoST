import React from 'react'

import Table from '@/components/Achievements/table';

const page = () => {
  let columnData = ["Title", "Description", "Edit/Delete"];


  return (
    <div>
       <h1 className="text-left  text-2xl font-bold text-primary">Achievement Details </h1>
      <Table page="achievements" colData = {columnData}></Table>
    </div>
  )
}

export default page

