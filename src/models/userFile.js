import mongoose, { Schema } from "mongoose";

const userFileSchema = new Schema({
  id: String,
  name: String,
  size: Number,
  type: String,
  data: Buffer,
});

const UserFile =
  mongoose.models?.UserFile || mongoose.model("UserFile", userFileSchema);

export default UserFile;