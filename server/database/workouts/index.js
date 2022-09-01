import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    name : { type : String, require : true },
    burn : { type : Number, require : true },
    descrip : { type : Number, require : true },
    area : { type : Number, require : true },
    level : { type : Number },
    weightLoss : { type : Boolean, require : true },
    tips : [{ type : String }],
    mistakes : [{ type : String }]
});

export const WworkoutModel = mongoose.model("Workouts", WorkoutSchema);