import express from "express";
import passport from "passport";

// Database
import { FoodModel } from "../../database/allModels";

// Validation
import { ValidateUserId } from "../../validation/foods";

const Router = express.Router();

/*
Route            /new
Des              Add new food
Access           Public
Method           POST
*/

Router.post("/new", async(req, res) => {
    try {
        const { foodData } = req.body;
        const newFood = await FoodModel.create(foodData);
        return res.status(201).json({ food : newFood });
    } catch(error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /myfoods
Des              Get foods added by me
Access           Public
Method           GET
*/

Router.get("/myfoods/:_id", async(req, res) => {
    try {

        await ValidateUserId(req.params);

        const { _id } = req.params;
        const foods = await FoodModel.find({ user : _id });

        return res.status(200).json({ foods : foods });
    } catch (error) {
        return res.status(500).json({ error : error.message });
    }
});

export default Router;