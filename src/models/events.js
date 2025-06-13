import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  date:String,
  event: String,
  venue: String,
  image: String,
  date: String,
  time: String,
  desc: String,
  club: String,
  ap:{type:Boolean, required:true}
});


const Events = mongoose.models?.Events || mongoose.model("Events", eventSchema);

export default Events;
