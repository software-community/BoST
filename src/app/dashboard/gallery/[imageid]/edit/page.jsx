import React from "react";
import EditImageForm from "@/components/Gallery/edit-form";
import { getImageByName } from "@/app/actions/GalleryData";

export default async function Page({ params, searchParams }) {
  const imagename = params.imageid;
  console.log("ye rhe searchParams",searchParams)
  const club = searchParams.club;

  let data = await getImageByName(club, imagename);
  console.log("ye rhe image details",data)

  return <EditImageForm url={data.url} name={data.name} />;
}
