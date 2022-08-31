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

/*
Route         /signin
Descrip       Signin with email and password
Params        None
Access        Public
Method        POST
*/

Router.post("/signin", async(req,res) => {
    try {
      
      await ValidateSignin(req.body.credentials);
      const new_user = await UserModel.findByEmailAndPassword(req.body.credentials);
      const user = { email : new_user }
  
      //JWT Auth Token
      const token = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken);
  
      return res.status(200).json({token, refreshToken, status: "Success"});
  
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
});

/*
Route         /signout
Descrip       Signout with email and password
Params        None
Access        Public
Method        POST
*/

Router.delete("/signout", async(req, res) => {
    try {
      const refreshToken = req.body.token
  
      refreshTokens = refreshTokens.filter(token => token !== refreshToken)
      res.status(204).json({ message : "logged out" })
  
    } catch (error) {
      return res.status(500).json({ error : error.message })
    }
});

export default Router;