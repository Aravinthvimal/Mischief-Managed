import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
    waterTarget : { type : Number, require : true },
    calorieTarget : { type : Number, require : true },
    calorieBurnTarget : { type : Number, require : true },
    dietPlan : { type : mongoose.Types.ObjectId, ref : "Diet"},
    gymer : { type : Boolean, require : true },
    workoutPlan : { type : mongoose.Types.ObjectId, ref : "WorkoutPlan"},
    workoutTime : { type : Number }
});

export const PreferenceModel = new mongoose.model("preferences", PreferenceSchema);