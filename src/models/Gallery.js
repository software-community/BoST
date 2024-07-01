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

const Gallery =
  mongoose.models?.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;