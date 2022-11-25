import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    food : { type : mongoose.Types.ObjectId, ref : "Foods" },
    workout : { type : mongoose.Types.ObjectId, ref : "Workout" },
    diet : { type : mongoose.Types.ObjectId, ref : "Diet" },
    workoutPlan : { type : mongoose.Types.ObjectId, ref : "WorkoutPlan" },
    reviewType : { type : String, require : true },
    ratings : { type : Number, require : true },
    title : { type : String, require : true },
    content : { type : String }
});

export const ReviewModel = mongoose.model("Reviews", ReviewSchema);