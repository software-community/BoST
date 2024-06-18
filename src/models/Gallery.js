import mongoose,{Schema} from "mongoose";

const gallerySchema=new Schema(
    {
        images:[String],
        club:String
    }
);

const Gallery=mongoose.models?.Gallery|| mongoose.model("Gallery",gallerySchema)

export default Gallery