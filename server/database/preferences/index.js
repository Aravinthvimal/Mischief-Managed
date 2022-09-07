import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    waterTarget : { type : Number, require : true },
    calorieTarget : { type : Number, require : true },
    calorieBurnTarget : { type : Number, require : true },
    dietPlan : { type : mongoose.Types.ObjectId, ref : "Diet"},
    gym : { type : Boolean, require : true },
    workoutPlan : { type : mongoose.Types.ObjectId, ref : "WorkoutPlan"},
    workoutTime : { type : Number },
    streaks : [{ type : Number }],
    foodType : { type : String, require : true },
    gender : { type : String },
    age : [{ type : Number, require : true }],
    allergic : { type : String }
});

export const PreferenceModel = mongoose.model("preferences", PreferenceSchema);