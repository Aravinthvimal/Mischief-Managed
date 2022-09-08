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
        return res.status(500).json({ user });

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
Route       /addDietPlan
Descrip     Add diet plan for user 
Params      none
Access      public
Method      PATCH
*/

Router.patch("/addDietPlan/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { addPlanData } = req.body;
        const { _id } = req.params;

        const updatedDietPlan = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : addPlanData,
            },
            {
                new : true
            }
        )

        return res.json({ user : updatedDietPlan });

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route       /setWaterGoal
Descrip     Set a new water goal for a user
Params      :_id
Access      public
Method      PATCH
*/

Router.patch("/setWaterGoal/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const { waterData } = req.body;
        const updatedGoal = await UserModel.findByIdAndUpdate(_id, 
            {
                $set : waterData,
            },
            {
                new : true,
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
Method      PATCH
*/

Router.patch("/addWater/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } =  req.params;
        const updatedWaterStatus = await UserModel.findByIdAndUpdate(_id, 
            {
                $inc : { cups : 1 },
            }
        )

        return res.status(200).json({ water : updatedWaterStatus })

    } catch(error) {
        res.status(500).json({ error : error.message });
    }

});

export default Router;
