import mongoose from "mongoose";

const DietSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, rel : "Users"},
    name : { type : String, require : true },
    session : { type : String, require : true },
    calories : { type : String, require : true },
    foodType : { type : String, require : true },
    weightLoss : { type : Boolean, require : true },
    foods : [{ type : mongoose.Types.ObjectId, rel : "Foods" }]
});

export const DietModel = mongoose.model("Diet", DietSchema);