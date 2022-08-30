import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    name : { type : String, require : true },
    burn : { type : Number, require : true },
    descrip : { type : Number, require : true },
    weightLoss : { type : Boolean, require : true },

    weekPlan : [{
        monday : { Type : String, require : true },
        tuesday : { Type : String, require : true },
        wednesday : { Type : String, require : true },
        thursday : { Type : String, require : true },
        friday : { Type : String, require : true },
        saturday : { Type : String, require : true },
        sunday : { Type : String, require : true },
    }],

    workouts : [{ type : mongoose.Types.ObjectId, ref : "Workouts" }],
});

export const workoutPlanModel = new mongoose.model("WorkoutPlan", workoutPlanSchema);