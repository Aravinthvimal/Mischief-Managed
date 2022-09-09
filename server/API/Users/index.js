import express from "express";

// Database
import { UserModel } from "../../database/users";

// Validation
import { ValidateSearchString, ValidateUserId } from "../../validation/foods"

const Router = express.Router();

/*
Route       /search
Descrip     Get user by name
Params      none
Access      public
Method      GET
*/

Router.get("/search", async(req, res) => {
    try {

        await ValidateSearchString(req.body);

        const { searchString } = req.body;
        const user = await UserModel.find({ 
            fullname : { $regex : searchString, $options : "i" },
        });
        return res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /
Descrip     Get user data
Params      :_id
Access      public
Method      GET
*/

Router.get("/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);
        
        const {_id } = req.params;
        const userData = await UserModel.findById(_id);

        res.status(200).json({ user : userData });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addFoodType
Descrip     Add food type for user 
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addFoodType/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { foodType } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedFoodType = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, foodType : foodType } },
            }
        )

        return res.status(200).json({ updatedFoodType });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addDietPlan
Descrip     Add diet plan for user 
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addDietPlan/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { addPlanData } = req.body;
        const { _id } = req.params;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedDietPlan = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, dietPlan : addPlanData } },
            }
        )

        return res.status(200).json({ user : updatedDietPlan });

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route       /setWaterGoal
Descrip     Set a new water goal for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/setWaterGoal/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { setWaterGoal } = req.body;
        const { _id } = req.params;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedGoal = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, waterTarget : setWaterGoal } },
            }
        )

        return res.status(200).json({ water : updatedGoal });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }

});

/*
Route       /addWater
Descrip     Add one cup of water for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addWater/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } =  req.params;
        const user = await UserModel.findById(_id);
        await user.updateOne({ $inc : { "preferences.cups" : 1 }});

        return res.status(200).json({ user });

    } catch(error) {
        res.status(500).json({ error : error.message });
    }

});

/*
Route       /addCalorieTarget
Descrip     Add calorie target for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addCalorieTarget/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { calorieTarget } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedCalorieTarget = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, calorieTarget : calorieTarget } },
            }
        )

        return res.status(200).json({ updatedCalorieTarget });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addBurnTarget
Descrip     Add calorie burn target for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addBurnTarget/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { burnTarget } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedBurnTarget = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, calorieBurnTarget : burnTarget } },
            }
        )

        return res.status(200).json({ updatedBurnTarget });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addGymStatus
Descrip     Add gym status for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addGymStatus/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { gymStatus } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedGymStatus = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, gym : gymStatus } },
            }
        )

        return res.status(200).json({ updatedGymStatus });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addGender
Descrip     Add gender for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addGender/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { gender } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedGender = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, gender : gender } },
            }
        )

        return res.status(200).json({ updatedGender });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addAge
Descrip     Add age for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addAge/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { age } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedAge = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, age : age } },
            }
        )

        res.status(200).json({ updatedAge });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /addAllergicFoods
Descrip     Add allergic foods for a user
Params      :_id
Access      public
Method      PUT
*/

Router.put("/addAllergicFoods/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { allergicFoods } = req.body;
        const user = await UserModel.findById(_id);
        const preferences = user.preferences;

        const updatedAllergicFoods = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : { preferences : { ...preferences, allergic : allergicFoods } },
            }
        )

        res.status(200).json({ updatedAllergicFoods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

export default Router;