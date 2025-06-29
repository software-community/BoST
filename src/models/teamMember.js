import mongoose, { Schema } from "mongoose";

if (mongoose.models["TeamMember"]) {
  delete mongoose.models["TeamMember"];
}

const teamMemberSchema = new Schema({
  name: String,
  position: String,
  image: String,
  email: String,
  linkedin: String,
  github: String,
  club: String,
  order: {type: Number, default: 0}
});

const TeamMember =
  mongoose.models?.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;