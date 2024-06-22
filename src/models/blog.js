import mongoose,{Schema} from "mongoose";

const blogSchema=new Schema(
    {
        title:String,
        content:String,
        author:String,
        club:String
    },
    {
        timestamps:true,
    }
);

function getBlogModel() {
  if(!mongoose.models.Blog){
    mongoose.model("Blog", blogSchema);
  } 
  return mongoose.models.Blog;
}

export default getBlogModel;