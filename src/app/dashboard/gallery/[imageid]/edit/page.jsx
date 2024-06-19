import React from "react";
import EditImageForm from "@/components/Gallery/edit-form";
import { getImageByName } from "@/app/actions/GalleryData";

export default async function Page({ params, searchParams }) {
  const imagename = params.imageid;
  const club = searchParams.club;

  let data = await getImageByName(club, imagename);

  return <EditImageForm url={data.url} name={data.name} />;
}
