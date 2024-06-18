import React from "react";
import EditImageForm from "@/components/Gallery/edit-form";
import { getImageByName } from "@/app/actions/GalleryData";


export default async function Page({ params }) {
  const imagename = params.imageid;
 
  let data = await getImageByName(imagename);

  return <EditImageForm imageDetails={data} />;
}
