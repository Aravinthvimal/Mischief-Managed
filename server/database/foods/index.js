import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name : { type : String, require : true },
    descrip : { type : String },
    cousine : { type : String },
    image : { type : String },
    banner : { type : String },
    foodPrepTime : { type : String },
    recipe : { type : String },

    nutrition : [{
        fat : { type : Number },
        sodium : { type : Number }, 
        sugar : { type : Number },
        protien : { type : Number},
    }],

    calories : { type : Number, require : true },
    isVeg : { type : Boolean, require : true },
    forWorkout : { type : Boolean, require : true },
    containsEgg : { type : Boolean, require : true },
    containsFish : { type : Boolean, require : true },
    session : [{ type : String, require : true }],

});

export const FoodModel = mongoose.model("Foods", FoodSchema);