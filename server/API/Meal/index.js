import express from "express";

// Database
import { MealModel } from "../../database/meal";

// Validation

const Router = express.Router();

/*
Route            /breakfast/add
Des              Add breakfast
Params           none
Access           Public
Method           POST
*/

Router.post("/breakfast/add", async(req, res) => {
    try {
        const breakfast = await MealModel.create(req.body.breakfast);
        return res.status(200).json({ meal : breakfast });
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