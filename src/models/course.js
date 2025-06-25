import mongoose, { Schema } from "mongoose";


const videoSchema = new Schema({
  url: { type: String, required: true },  
  title: { type: String, default: "" },    
});


const pdfSchema = new Schema({
  url: { type: String, required: true },   
  name: { type: String, default: "" },  
});

const moduleSchema = new Schema({
  moduleName: { type: String, required: true },
  moduleDesc: { type: String, required: true },
  moduleVideos: { type: [videoSchema], default: [] },
  modulePdfs: { type: [pdfSchema], default: [] },
});

const courseSchema = new Schema({
  courseName: String,
  courseDesc: String,
  instructorImage: String,
  instructorName: String,
  modules: [moduleSchema],
  startDate: String,
  endDate: String,
  club: String,
});

const Courses =
  mongoose.models?.Courses || mongoose.model("Courses", courseSchema);

export default Courses;
