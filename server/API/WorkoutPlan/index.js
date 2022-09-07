import express from "express";

// Database 
import { workoutPlanModel } from "../../database/allModels";

const Router = express.Router();

/*
Route       /new
Descrip     Create a new workout
Params      none
Access      public
Method      POST
*/