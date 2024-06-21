import mongoose, { Schema } from "mongoose";

const teamMemberSchema = new Schema({
  name: String,
  position: String,
  image: String,
  email: String,
  club: String,
});

async function getTeamMemberModel() {
  if (!mongoose.models.TeamMember) {
    return mongoose.model("TeamMember", teamMemberSchema);
  }
  return mongoose.models.TeamMember;
}

export default getTeamMemberModel;
