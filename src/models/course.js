import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  moduleName: String,
  moduleDesc: String,
  moduleVideo: String,
  modulePdf: String,
});

const courseSchema = new Schema({
  courseName: String,
  courseDesc: String,
  instructorImage: String,
  instructorName: String,
  modules: [moduleSchema],
  startDate : String,
  endDate : String,
  club: String,
});

const Courses =
  mongoose.models?.Courses || mongoose.model("Courses", courseSchema);

export default Courses;
