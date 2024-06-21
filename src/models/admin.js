import mongoose,{Schema} from "mongoose";

const adminSchema=new Schema(
    {
        email:String,
        googleId:String,
        name:String,
        image:String,
    }
);

function getAdminModel() {
  if(!mongoose.models.Admin){
    mongoose.model("Admin", adminSchema);
  } 
  return mongoose.models.Admin;
}

export default getAdminModel;