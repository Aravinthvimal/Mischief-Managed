import mongoose from "mongoose";

const BlogsSchema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" , require : true},
    blogType : { type : String, require : true },
    title : { type : String, require : true },
    content : { type : String, require : true }
});

export const BlogModel = mongoose.model("Blogs", BlogsSchema);

