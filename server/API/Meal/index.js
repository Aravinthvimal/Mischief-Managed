import express from "express";
import mongoose, { now } from "mongoose";

// Database
import { FoodModel, MealModel, UserModel } from "../../database/allModels";

// Validation

const Router = express.Router();

/*
Route            /breakfast/add
Des              Add breakfast
Params           none
Access           Public
Method           POST
*/

Router.post("/breakfast/add/:_id", async(req, res) => {
    try {
        
        const { _id } = req.params;

        // get current date
        const date = new Date();
        var nowDate = date.getDate();
        
        // find calories of the added food
        const foodData = await FoodModel.findById(req.body.breakfast.food);
        const foodCalories = foodData.calories;

        // get the date of the last meal
        const userData = await UserModel.findById(_id);
        const userMealDate = userData.preferences.lastMeal;

        if(nowDate - userMealDate > 0) {

            console.log("different day");

            await UserModel.findByIdAndUpdate(_id,
                {
                    $set : { "preferences.calorieToday" : 0 },
                }
            );
        };

        console.log("same day");
        
        const user = await UserModel.findByIdAndUpdate(_id,
            
            {
                $inc : { "preferences.calorieToday" : foodCalories },
            }
        );

        const breakfast = await MealModel.create(req.body.breakfast);

        await UserModel.findByIdAndUpdate(_id, 
            {
               $set : { "preferences.lastMeal" : nowDate }, 
            }   
        );

        return res.status(200).json({ meal : breakfast, user : user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route            /morning-snack/add
Des              Add morning snack
Params           none
Access           Public
Method           POST
*/

Router.post("/morning-snack/add", async(req, res) => {
    try {
        const morningSnack = await MealModel.create(req.body.morning);
        return res.status(200).json({ meal : morningSnack });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route            /lunch/add
Des              Add morning snack
Params           none
Access           Public
Method           POST
*/

Router.post("/lunch/add", async(req, res) => {
    try {
        const lunch = await MealModel.create(req.body.lunch);
        return res.status(200).json({ meal : lunch });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route            /evening-snack/add
Des              Add morning snack
Params           none
Access           Public
Method           POST
*/

Router.post("/evening-snack/add", async(req, res) => {
    try {
        const eveningSnack = await MealModel.create(req.body.evening);
        return res.status(200).json({ meal : eveningSnack });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route            /dinner/add
Des              Add morning snack
Params           none
Access           Public
Method           POST
*/

Router.post("/dinner/add", async(req, res) => {
    try {
        const dinner = await MealModel.create(req.body.dinner);
        return res.status(200).json({ meal : dinner });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;