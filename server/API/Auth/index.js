import express from "express";
import jwt from "jsonwebtoken";

const Router = express.Router();

// Models 
import { UserModel } from "../../database/users";

// Validations
import { ValidateSignin, ValidateSignup } from "../../validation/auth";

let refreshTokens = [];

/*
Route       /signup
Descrip     Singup with email and password
Params      none
Access      public
Method      POST
*/

Router.post("/signup", async(req, res) => {
    try {

        await ValidateSignup(req.body.credentials);
        await UserModel.findEmailAndPhone(req.body.credentials);

        // Database
        const newUser = await UserModel.create(req.body.credentials);
        const user = { email : newUser }
        
        // Generate JWT 
        const token = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken);

        return res.status(200).json({ token, refreshToken  });

    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '7d'} ) 
}



export default Router;