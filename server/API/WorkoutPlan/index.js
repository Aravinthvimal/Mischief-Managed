import express from "express";

// Database 
import { workoutPlanModel } from "../../database/allModels";
import { ValidateSearchString } from "../../validation/foods";

// Validation
import { ValidateWworkoutId } from "../../validation/workout";

const Router = express.Router();

/*
Route       /new
Descrip     Create a new workoutPlan
Params      none
Access      public
Method      POST
*/

Router.post("/new", async(req, res) => {
    try {

        const { workoutPlanData } = req.body;
        const newWorkoutPlan = await workoutPlanModel.create(workoutPlanData);
        return res.status(201).json({ workoutPlan : newWorkoutPlan });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /myplans
Descrip     Get workout plan added by a particular user
Params      :_id
Access      public
Method      GET
*/

Router.get("/myplans/:_id", async(req, res) => {
    try {

        const { _id } = req.params;
        const workoutPlans = await workoutPlanModel.find({ user : _id });
        return res.status(200).json({ workoutPlans });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /search
Descrip     Get workout plan by name
Params      none
Access      public
Method      GET
*/

Router.get("/search", async(req, res) => {
    try {
        
        await ValidateSearchString(req.body);

        const { searchString } = req.body;
        const workoutPlans = await workoutPlanModel.find({
            name : { $regex : searchString, $options : "i" },
        });

        return res.status(200).json({ workoutPlans });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /
Descrip     Get detais of a workout plan
Params      :_id
Access      public
Method      GET
*/

Router.get("/:_id", async(req, res) => {

    try {

        await ValidateWworkoutId(req.params);

        const { _id } = req.params;
        const workoutPlan = await workoutPlanModel.findById(_id);
        return res.status(200).json({ workoutPlan });

    } catch (error) {
        return res.status(500).json({ error : error.message });
    }

});

export default Router;