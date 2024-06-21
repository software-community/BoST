import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema(
  {
    images: [
      {
        name: String,
        url: String,
      },
    ],
    club: String,
  },
  {
    timestamps: true,
  }
);

async function getGalleryModel() {
  if (!mongoose.models.Gallery) {
    return mongoose.model("Gallery", gallerySchema);
  }
  return mongoose.models.Gallery;
}

export default getGalleryModel;
