import express from "express";


// Database
import { FoodModel, UserModel } from "../../database/allModels";

// Validation
import { ValidateSearchString, ValidateUserId } from "../../validation/foods";

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

/*
Route            /search
Des              Get foods with name
Access           Public
Method           GET
*/

Router.get("/search", async(req, res) => {
    try {
        
        await ValidateSearchString(req.body);

        const { searchString } = req.body;
        const foods = await FoodModel.find({
            name : { $regex : searchString, $options : "i" },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

// FILTERS
// name, calories, session, ingredients, fat-free, sugar-free, sodium-free, food-type

/*
Route            /calories
Des              Get foods filtered based on calories
Access           Public
Method           GET
*/

Router.get("/calories", async(req, res) => {
    try {

        const { calories } = req.body;
        const foods = await FoodModel.find({
            calories : { $lt : calories },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /session
Des              Get foods filtered based on calories
Access           Public
Method           GET
*/

Router.get("/session", async(req, res) => {
    try {

        await ValidateSearchString(req.body);

        const { searchString } = req.body;
        const foods = await FoodModel.find({
            session : { $regex : searchString, $options : "i" },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /ingredients
Des              Get foods filtered based on ingredients
Access           Public
Method           GET
*/

Router.get("/ingredients", async(req, res) => {
    try {

        await ValidateSearchString(req.body);

        const { searchString } = req.body;
        const foods = await FoodModel.find({
            "recipe.ingredients" : { $regex : searchString, $options : "i" },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /fat-free
Des              Get foods filtered fat-free
Access           Public
Method           GET
*/

Router.get("/fat-free", async(req, res) => {
    try {

        const foods = await FoodModel.find({
            "nutrition.fat" : { $lt : 15 },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /sugar-free
Des              Get foods filtered sugar-free
Access           Public
Method           GET
*/

Router.get("/sugar-free", async(req, res) => {
    try {

        const foods = await FoodModel.find({
            "nutrition.sugar" : { $lt : 20 },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /sodium-free
Des              Get foods filtered sodium-free
Access           Public
Method           GET
*/

Router.get("/sodium-free", async(req, res) => {
    try {

        const foods = await FoodModel.find({
            "nutrition.sodium" : { $lt : 10 },
        });

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route            /feed
Des              Get foods according to foodType of a particular user
Params           :_id
Access           Public
Method           GET
*/

// FoodTypes : Veg, Non, Egg, Flex, Fish 

Router.get("/feed/:_id", async(req, res) => {

    try {

        const { _id } = req.params;
        const userData = await UserModel.findById(_id);
        const foodType = userData.preferences.foodType.toString();

        console.log(foodType);
        
        switch(foodType) {

            case "Veg" : 
                var foods = await FoodModel.find({
                    isVeg : true,
                    containsEgg : false,
                    containsFish : false,
                });

            break;

            case "Non" : 
                var foods = await FoodModel.find({
                    isVeg : false,
                });

            break;

            case "Egg" : 
                var foods = await FoodModel.find({
                    isVeg : false,
                    containsEgg : true,
                });

            break;

            case "Flex" : 
                var foods = await FoodModel.find({});
            break;

            case "Fish" : 
                var foods = await FoodModel.find({
                    isVeg : false,
                    "containsEgg" : true,
                });
            
            break;
    
        }

        return res.status(200).json({ foods });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }

});

export default Router;