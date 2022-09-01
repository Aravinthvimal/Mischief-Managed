import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    name : { type : String, require : true },
    burn : { type : Number, require : true },
    descrip : { type : Number, require : true },
    weightLoss : { type : Boolean, require : true },

    weekPlan : [{
        monday : { type : String, require : true },
        tuesday : { type : String, require : true },
        wednesday : { type : String, require : true },
        thursday : { type : String, require : true },
        friday : { type : String, require : true },
        saturday : { type : String, require : true },
        sunday : { type : String, require : true },
    }],

    workouts : [{ type : mongoose.Types.ObjectId, ref : "Workouts" }],
});

export const workoutPlanModel = mongoose.model("WorkoutPlan", workoutPlanSchema);