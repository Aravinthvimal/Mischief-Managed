import express from "express"

// Database
import { ReviewModel } from "../../database/allModels"

const Router = express.Router();

/*
Route            /new
Des              Add new review
Access           Public
Method           POST
*/

Router.post('/new', async(req, res) => {
    try {
        const { ReviewData } = req.body;
        const newReview = await ReviewModel.create(ReviewData);
        return res.status(201).json({ review : newReview });
    } catch(error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /my-reviews/:_id
Des              Get reviews posted by a particular user
Access           Public
Method           GET
*/

Router.get('/my-reviews/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const userReviews = await ReviewModel.find({ user : _id });
        return res.status(200).json({ userReviews : userReviews });
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /food-review/:_id
Des              Get reviews for a particular food
Access           Public
Method           GET
*/

Router.get('/food-review/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const foodReviews = await ReviewModel.find({ food : _id });
        return res.status(200).json({ foodReviews : foodReviews });
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /workout-review/:_id
Des              Get reviews for a particular workout
Access           Public
Method           GET
*/

Router.get('workout-review/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const workoutReviews = await ReviewModel.find({ workout : _id });
        return res.status(200).json({ workoutReviews : workoutReviews });
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /diet-review/:_id
Des              Get reviews for a particular diet plan
Access           Public
Method           GET
*/

Router.get('/diet-review/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const dietReviews = await ReviewModel.find({ diet : _id });
        return res.status(200).json({ dietReviews : dietReviews });
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /workoutPlan-review/:_id
Des              Get reviews for a particular workout plan
Access           Public
Method           GET
*/

Router.get('/workoutPlan-review/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const workoutPlanReviews = await ReviewModel.find({ workoutPlan : _id });
        return res.status(200).json({ workoutPlanReviews : workoutPlanReviews });
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

export default Router