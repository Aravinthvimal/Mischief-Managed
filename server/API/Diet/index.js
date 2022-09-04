import express from "express";
import passport from "passport";

// Models
import { DietModel } from "../../database/allModels";

// Validation
import { ValidateDietPlanId } from "../../validation/diet";

const Router = express.Router();

/*
Route       /new
Descrip     Create new Diet plan
Params      none
Access      public
Method      POST
*/

Router.post("/new", async(req, res) => {
    try {
        const { dietData } = req.body;
        const newDiet = await DietModel.create(dietData);
        return res.status(201).json({ dietPlan : newDiet });
    } catch(error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /myplans
Descrip     Get Diet plans of a particular user
Params      :_id
Access      public
Method      GET
*/

Router.get("/myplans/:_id", async(req, res) => {
    try {

        await ValidateDietPlanId(req.params);

        const { _id } = req.params;
        const myplans = await DietModel.find({ user : _id });

        return res.status(200).json({ dietPlans : myplans });

    } catch(error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /
Descrip     Get Diet plan data
Params      :_id
Access      public
Method      GET
*/

Router.get("/:_id", async(req, res) => {
    try {
        
        await ValidateDietPlanId(req.params);

        const { _id } = req.params;
        const dietPlanData = await DietModel.findById(_id);
        res.status(200).json({ dietPlan : dietPlanData });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

export default Router;