import express from "express";

// Database
import { UserModel } from "../../database/users";

// Validation
import { ValidateUserId } from "../../validation/foods"

const Router = express.Router();

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

export default Router;
