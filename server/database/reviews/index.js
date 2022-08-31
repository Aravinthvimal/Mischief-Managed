import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, rel : "Users" },
    reviewType : { type : String, require : true },
    ratings : { type : Number, require : true },
    title : { type : String, require : true },
    content : { type : String }
});

export const ReviewModel = mongoose.model("Reviews", ReviewSchema);