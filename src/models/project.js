import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    members: String,
    github: String,
    website: String,
    image: String,
    status: String,
    club: String,
  },
  {
    timestamps: true,
  }
);

async function getProjectModel() {
  if (!mongoose.models.Project) {
    return mongoose.model("Project", projectSchema);
  }
  return mongoose.models.Project;
}

export default getProjectModel;

export function setIcons(l) {
  if (!l.icon) {
    l.icon = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + l.url;
  }
  return { url: l.url, title: l.title, icon: l.icon };
}
