import React from "react";
import Form from "@/components/Events/edit-form";
import { getEventById } from "@/app/actions/EventData";

export default async function Page({ params }) {
  const eventid = params.eventid;
  const dataArray = await getEventById(eventid);
  const data = dataArray[0]

  

  return <Form eventDetails={data} />;
}
