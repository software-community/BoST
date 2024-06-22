import mongoose, { Schema } from "mongoose";

const achievementSchema = new Schema(
  {
    text: [
      {
        title: String,
        description: String,
      },
    ],
    club: String,
  }
);


function getAchievementModel() {
  if(!mongoose.models.Achievement){
    mongoose.model("Achievement", achievementSchema);
  } 
  return mongoose.models.Achievement;
}


export default getAchievementModel;
