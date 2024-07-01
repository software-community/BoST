import mongoose,{Schema} from "mongoose";

const adminSchema=new Schema(
    {
        email:String,
        googleId:String,
        name:String,
        image:String,
    }
);

const Admin=mongoose.models?.Admin|| mongoose.model("Admin",adminSchema)

export default Admin