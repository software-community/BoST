import mongoose,{Schema} from "mongoose";

const teamMemberSchema=new Schema(
    {
      name:String,
      position:String,
      image:String,
      email:String,
      club:String,
    },
    {
        timestamps:true,
    }
);

const TeamMember=mongoose.models?.TeamMember|| mongoose.model("TeamMember", teamMemberSchema)

export default TeamMember