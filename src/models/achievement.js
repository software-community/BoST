import mongoose, { Schema } from "mongoose";

const achievementSchema = new Schema(
  {
    text: [
      {
        title: String,
        description: String,
      },
    ],
    club: String,
  }
);

const Achievement =
  mongoose.models?.Achievement ||
  mongoose.model("Achievement", achievementSchema);

export default Achievement;