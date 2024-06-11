import React from 'react'
import Blog from '@/components/Blog/createBlog';
// import { UserCircleIcon } from '@heroicons/react/solid';

const clubs = [
  { id: 1, name: "Chess Club" },
  { id: 2, name: "Art Club" },
  { id: 3, name: "Music Club" }
];

const page = (dispatch) => {
  return (
    <Blog />
  )
}

export default page