import mongoose, { Schema } from "mongoose";

const teamMemberSchema = new Schema({
  name: String,
  email: String,
  image: String,
  github: String,
  linkedin: String,
});

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    members: [teamMemberSchema],
    github: String,
    website: String,
    image: String,
    status: String,
    club: String,
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models?.Project || mongoose.model("Project", projectSchema);

export default Project;

export function setIcons(l) {
  if (!l.icon) {
    l.icon = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + l.url;
  }
  return { url: l.url, title: l.title, icon: l.icon };
}
