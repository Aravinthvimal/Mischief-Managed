import express from "express";
import passport from "passport";

// Models
import { DietModel } from "../../database/allModels";
import { ValidateDietPlanId, ValidateDietPlanFoods } from "../../validation/diet";

// Validation

const Router = express.Router();

/*
Route       /new
Descrip     Create new Diet plan
Params      none
Access      public
Method      POST
*/

Router.post("/new", passport.authenticate("jwt"), async(req, res) => {
    try {

        //await ValidateDietPlanFoods(req.body);

        const { DietPlanData } = req.body;
        const newDietPlan = await DietModel.create(DietPlanData);
        return res.status(200).json({ dietPlan : newDietPlan });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /myplans
Descrip     Get user Diet plans
Params      none
Access      public
Method      GET
*/

Router.get("/myplans/:_id", passport.authenticate("jwt"), async(req, res) => {
    try {

        await ValidateDietPlanId(req.params);

        const { _id } = req.params;
        const myplans = await DietModel.find({ user : _id });

        return res.status(200).json({ dietPlans : myplans });

    } catch(error) {
        res.status(500).json({ error : error.message });
    }
});

export default Router;