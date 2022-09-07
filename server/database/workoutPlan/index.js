import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    name : { type : String, require : true },
    burn : { type : Number, require : true },
    descrip : { type : String, require : true },
    weightLoss : { type : Boolean, require : true },

    // weekPlans : Legs, Shoulder, Abs, Chest, Back, Arms, Cardio, Rest

    weekPlan : [{
        mon : [{ type : String, require : true }],
        tues : [{ type : String, require : true }],
        wed : [{ type : String, require : true }],
        thurs : [{ type : String, require : true }],
        friday : [{ type : String, require : true }],
        sat : [{ type : String, require : true }],
        sunday : [{ type : String, require : true }],
    }],

    workouts : [{ type : mongoose.Types.ObjectId, ref : "Workout" }],
});

export const workoutPlanModel = mongoose.model("WorkoutPlan", workoutPlanSchema);