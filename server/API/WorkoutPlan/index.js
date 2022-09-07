import express from "express";

// Database 
import { workoutPlanModel } from "../../database/allModels";

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

export default Router;