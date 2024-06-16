import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    members: [String],
    relatedLinks:[{
      // title: String,
      url: String,
      icon: String,
    }],
    images: [String],
    status: String,
    club: String,
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
