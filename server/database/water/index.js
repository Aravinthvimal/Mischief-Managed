import mongoose from "mongoose";

const WaterSchema = new mongoose.Schema({
    cups : { type : Number, require : true }
});

export const WaterModel = mongoose.model("Water", WaterSchema);