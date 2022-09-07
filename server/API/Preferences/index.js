import express from "express";

// Database 
import { PreferenceModel } from "../../database/allModels";

const Router = express.Router();

/*
Route       /new
Descrip     Add preferences for a user
Params      none
Access      public
Method      PATCH
*/

Router.post("/new", async(req, res) => {
    try {

        const { preferenceData } = req.body;
        const newPreference = await PreferenceModel.create(preferenceData);
        return res.status(201).json({ preferences : newPreference });

    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

export default Router;