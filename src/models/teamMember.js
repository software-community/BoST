import mongoose, { Schema } from "mongoose";

const teamMemberSchema = new Schema({
  name: String,
  position: String,
  image: String,
  email: String,
  linkedin: String,
  github: String,
  club: String,
});

const TeamMember =
  mongoose.models?.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;