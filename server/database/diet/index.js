import mongoose from "mongoose";

const DietSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref : "Users"},
    name : { type : String, require : true },
    session : { type : String, require : true },
    calories : { type : Number, require : true },
    foodType : { type : String, require : true },
    weightLoss : { type : Boolean, require : true },
    foods : [{ type : mongoose.Types.ObjectId, ref : "Foods" }]
});

export const DietModel = mongoose.model("Diet", DietSchema);