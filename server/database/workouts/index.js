import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    name : { type : String, required : true },
    burn : { type : Number, required : true },
    descrip : { type : String, required : true },
    area : [{ type : String, required : true }],
    level : { type : String },
    weightLoss : { type : Boolean, required : true },
    tips : [{ type : String }],
    mistakes : [{ type : String }],
    onBed : { type : Boolean, required : true },
    session : { type : String, required : true },
    user : { type : mongoose.Types.ObjectId, ref : "Users" }
},
{
    timestamps : true
});

export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);