import React from 'react'
import Table from '@/components/tableTeamPage'

const page = () => {
  let teamMemDetails = [
    {
      id: "1",
      name: "Keshav Arora",
      image_url: "/TeamImages/Insta Profile.jpg",
      email: "keshav11y@gmail.com",
      Club: "SoftCom",
      Position: "Co-ordinator",
    },
    {
      id: "2",
      name: "Keshav",
      image_url: "/TeamImages/Insta Profile.jpg",
      email: "keshav11y@gmail.com",
      Club: "BOST",
      Position: "Secretary",
    },
    {
      id: "3",
      name: "Keshav",
      image_url: "/TeamImages/Insta Profile.jpg",
      email: "keshav11y@gmail.com",
      Club: "BOST",
      Position: "Secretary",
    },
    {
      id: "4",
      name: "Keshav",
      image_url: "/TeamImages/Insta Profile.jpg",
      email: "keshav11y@gmail.com",
      Club: "BOST",
      Position: "Secretary",
    },
    {
      id: "5",
      name: "Keshav Arora",
      image_url: "/TeamImages/Insta Profile.jpg",
      email: "keshav11y@gmail.com",
      Club: "BOST",
      Position: "Secretary",
    },
    {
      id: "6",
      name: "Keshav",
      image_url: "/TeamImages/Insta Profile.jpg",
      email: "keshav11y@gmail.com",
      Club: "BOST",
      Position: "Secretary",
    },
  ];

const ColumnData = ["Team Member", "Email", "Club", "Position", "Edit / Delete"]


  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Team Details </h1>
      <Table colData = {ColumnData} data={teamMemDetails} page="team" ></Table>
    </div>
  )
}


export default page;
