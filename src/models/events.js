import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    events: [
      {
        date: Number,
        title: String,
        about: String,
        venue: String,
        time: String,
      },
    ],
    club: String,
  }
);

const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);

export default Event;
