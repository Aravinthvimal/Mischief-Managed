import express from "express";

// Database
import { WorkoutModel } from "../../database/allModels";

// Validation
import { ValidateSearchString } from "../../validation/foods";

const Router = express.Router();

/*
Route       /new
Descrip     Create a new workout
Params      none
Access      public
Method      POST
*/

Router.post("/new", async(req, res) => {
    try {

        const { workoutData } = req.body;
        const newWorkout = await WorkoutModel.create(workoutData);
        return res.status(201).json({ workout : newWorkout });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /area
Descrip     Get workout based on area
Params      :area
Access      public
Method      GET
*/

Router.get("/area/:area", async(req, res) => {
    try {

        const { area } = req.params;
        const workouts = await WorkoutModel.find({area});
        return res.status(200).json({ workouts });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /level
Descrip     Get workout based on area
Params      :level
Access      public
Method      GET
*/

Router.get("/level/:level", async(req, res) => {
    try {

        const { level } = req.params;
        const workouts = await WorkoutModel.find({ level });
        return res.status(200).json({ workouts });

    } catch (error) {
        res.status(200).json({ error : error.message });
    }
});

/*
Route       /weightloss
Descrip     Get workout based on area
Params      none
Access      public
Method      GET
*/

Router.get("/weightLoss", async(req, res) => {
    try {

        const workouts = await WorkoutModel.find({ 
            weightLoss : true
        });
        return res.status(200).json({ workouts });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /search
Descrip     Search workout based with name
Params      none
Access      public
Method      GET
*/

Router.get("/search", async(req, res) =>{
    try {

        await ValidateSearchString(req.body);
        
        const { searchString } = req.body;
        const workouts = await WorkoutModel.find({
            name : { $regex : searchString, $options : "i" },
        });

        return res.status(200).json({ workouts });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /bedtime
Descrip     Search workouts to do on bed
Params      none
Access      public
Method      GET
*/

Router.get("/bedtime", async(req, res) => {
    try {

        const workouts = await WorkoutModel.find({
            onBed : true
        });

        res.status(200).json({ workouts });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /session
Descrip     Search workouts based on session
Params      none
Access      public
Method      GET
*/

Router.get("/session", async(req, res) => {
    try {

        await ValidateSearchString(req.body);

        const { searchString } = req.body;
        const workouts = await WorkoutModel.find({
            session : { $regex : searchString, $options : "i" },
        });

        return res.status(200).json({ workouts });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

/*
Route       /
Descrip     Get workout details with id
Params      :_id
Access      public
Method      GET
*/

Router.get("/:_id", async(req, res) => {
    try {

        const { _id } = req.params;
        const workoutData = await WorkoutModel.findById(_id);
        return res.status(200).json({ workout : workoutData });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

export default Router;