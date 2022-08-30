import mongoose from "mongoose";

const WaterSchema = new mongoose.Schema({
    cups : { type : Number, require : true }
});

export const WaterModel = new mongoose.model("water", WaterModel);