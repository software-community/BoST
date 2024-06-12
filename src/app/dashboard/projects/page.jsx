import React from 'react'
import Project from '@/components/Project/createProject';
import Table from '@/components/tableProjectPage'


let columnData = ["Title", "Description", "Status", "Club", "Edit/Delete"];
let blogData = [
  {
    id: 1,
    Title: "Exploring the Hidden Gems of the City",
    Desc: "So hello guys, keshav this side and here is my first project on AI and ML. I am interested in learning AI ML and datascience. I will try to learn it as soon as I get time.",
    Status: "Ongoing",
    Club: "SoftCom",
  },
  {
    id: 2,
    Title: "The Art of Mindfulness: Finding Peace in Chaos",
    Desc: "Curabitur pharetra felis id leo pulvinar, vel malesuada libero dictum. Fusce consequat, sapien ac pulvinar posuere, justo ipsum blandit odio, a scelerisque metus est non justo. Sed non erat justo. Sed ut dolor quis eros fermentum elementum nec et orci. Integer sit amet mi id purus consequat tempor id non sapien. Donec cursus velit id arcu cursus, vel vulputate sapien placerat.",
    Status: "Pending",
    Club: "Wellness Club",
  },
  {
    id: 3,
    Title: "Mastering the Fundamentals of Programming",
    Desc: "Proin tempus, risus sit amet accumsan dapibus, lectus turpis pretium libero, a iaculis erat ligula a elit. Nam ut fringilla risus. Aliquam erat volutpat. Suspendisse potenti. Quisque vehicula, ipsum a euismod pharetra, nisi risus consectetur risus, vel tincidunt orci est at nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    Status: "Completed",
    Club: "Tech Club",
  },
  {
    id: 4,
    Title: "A Culinary Journey Through Italy",
    Desc: "Vestibulum vehicula quam ut ligula ullamcorper, ut condimentum lorem convallis. Ut vulputate eros at mauris pharetra, et bibendum lorem sodales. Integer vitae justo tincidunt, vulputate justo eu, vehicula libero. Nullam quis magna at enim vehicula facilisis. Aliquam erat volutpat. Donec ut libero sollicitudin, auctor magna ut, luctus libero. Praesent a metus nec sem bibendum fringilla a at libero.",
    Status: "Ongoing",
    Club: "Food Club",
  },
  {
    id: 5,
    Title: "The Future of Renewable Energy",
    Desc: "Pellentesque at lectus sed justo volutpat bibendum. Curabitur suscipit, turpis eget vestibulum consequat, sapien eros auctor odio, sit amet bibendum nisl nunc id metus. Integer non nisi ac mi eleifend dictum. Quisque auctor elit a lorem malesuada, nec venenatis velit placerat. Praesent suscipit vehicula orci sit amet posuere. Aliquam erat volutpat. Aenean a magna lacus. Duis volutpat lacinia tortor.",
    Status: "Completed",
    Club: "Science Club",
  },
  {
    id: 6,
    Title: "My new project",
    Desc: "Pellentesque at lectus sed justo volutpat bibendum. Curabitur suscipit, turpis eget vestibulum consequat, sapien eros auctor odio, sit amet bibendum nisl nunc id metus. Integer non nisi ac mi eleifend dictum. Quisque auctor elit a lorem malesuada, nec venenatis velit placerat. Praesent suscipit vehicula orci sit amet posuere. Aliquam erat volutpat. Aenean a magna lacus. Duis volutpat lacinia tortor.",
    Status: "pending",
    Club: "Coding Club",
  }
];

const page = () => {
  return (
    <Table colData={columnData} page="projects" data={blogData}></Table>
  )
}

export default page