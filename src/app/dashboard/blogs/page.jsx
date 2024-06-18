import React from 'react'

import Table from '@/components/Blog/table';

const page = () => {
  let columnData = ["Title", "Content", "Author", "Club", "Edit/Delete"];


  return (
    <div>
       <h1 className="text-left  text-2xl font-bold">Blog Details </h1>
      <Table page="blogs" colData = {columnData}></Table>
    </div>
  )
}

export default page

