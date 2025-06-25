import React from 'react'
import Form from '@/components/Course/module-create-form'

const page = ({ params }) => {
  const courseid = params.courseid?.toString();
  // console.log(courseid)
  return <Form courseid={courseid} />;
};

export default page;
