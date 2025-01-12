import mongoose, { Schema } from "mongoose";

const clubsSchema = new Schema({
  club: String,
  name: String,
  introduction: String,
  logo: String,
});

const Clubs = mongoose.models?.Clubs || mongoose.model("Clubs", clubsSchema);

export default Clubs;