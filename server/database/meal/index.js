import mongoose from "mongoose";

const MealSchema = mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    food : { type : mongoose.Types.ObjectId, ref : "Foods" },
    quantity : { type : Number, require : true },
    favourite : { type : Boolean }
});

export const MealModel = mongoose.model("Meal", MealSchema);