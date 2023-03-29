import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullname : { type : String },
    email : { type : String, require : true },
    password : { type : String},
    mobile : { type : Number },    

    preferences : {

        // FoodTypes : Veg, Non, Egg, Flex, Fish 
        foodType : { type : String, required : true },                              // ADDED

        dietPlan : { type : mongoose.Types.ObjectId, ref : "Diet" },                // ADDED
        workoutPlan : { type : mongoose.Types.ObjectId, ref : "WorkoutPlan"},

        waterTarget : { type : Number, default : 10 },                              // ADDED
        cups : { type : Number, default : 0 },                                      // ADDED
        streaks : [{ type : Number }],

        calorieTarget : { type : Number, required : true },                         // ADDED
        calorieBurnTarget : { type : Number, required : true },                     // ADDED

        lastMeal : { type : Number, default : 0 },
        calorieToday : { type : Number, default : 0 },
        calorieBurntToday : { type : Number, default : 0 },

        gym : { type : Boolean, required : true },                                  // ADDED
        
        gender : { type : String },                                                 // ADDED
        age : { type : Number, required : true },                                   // ADDED
        allergic : [{ type : String }]
    }
},
{
    timestamps : true
});

UserSchema.methods.generateJwtToken = function() {
    return jwt.sign({user : this._id.toString()}, "MischiefManagedApp");
};

UserSchema.statics.findEmailAndPhone = async ({ email, mobile }) => {

    //check whether the email exists
    const checkUserByEmail = await UserModel.findOne({email});
  
    //check whether the phoneNumber Exists
    const checkUserByPhone = await UserModel.findOne({mobile});
    if(checkUserByEmail || checkUserByPhone) {
      throw new Error("User already exist");
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    //check whether the email exists
    const user = await UserModel.findOne({email});
    if(!user) throw new Error("User does not exist");
  
    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
  
    if(!doesPasswordMatch) {
      throw new Error("Invalid password");
    }

    return user;
};

UserSchema.pre("save", function(next){
    const user = this;
  
    //password isnot modified
    if(!user.isModified("password")) return next();
  
    //generating bcrypt salt
    bcrypt.genSalt(8,(error,salt)=> {
        if(error) return next(error);

        //hashing the password
        bcrypt.hash(user.password, salt, (error,hash) => {
        if(error) return next(error);
        
        //assigning hashed password
        user.password = hash;
        return next();
            
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);