import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    user : { type : mongoose.Types.ObjectId, ref : "Users" },
    name : { type : String, require : true },
    descip : { type : String },
    cousine : { type : String },

    nutrition : [{
        fat : { type : Number },
        sodium : { type : Number }, 
        sugar : { type : Number },
        protien : { type : Number},
    }],

    recipe : [{
        ingredients : [{ type : String, require : true }],
        time : { type : Number, require : true },
        website : { type : String },
        tips : [{ type : String }]
    }],

    calories : { type : Number, require : true },
    isVeg : { type : Boolean, require : true },
    forWorkout : { type : Boolean, require : true },
    containsEgg : { type : Boolean, require : true },
    containsFish : { type : Boolean, require : true },
    session : [{ type : String, require : true }],

});

export const FoodModel = new mongoose.model("Foods", FoodSchema);