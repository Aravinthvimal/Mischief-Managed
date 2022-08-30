import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname : { type : String, require : true },
    email : { type : String, require : true },
    password : { type : String },
    city : { type : String, require : true },
    mobile : [{ type : Number, require : true }],
    streaks : [{ type : Number }],
    foodType : { type : String, require : true },
    gender : { type : String },
    age : [{ type : Number, require : true }],
    allergic : { type : String }
});

export const UserModel = mongoose.model("Users", UserSchema);