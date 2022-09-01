// env config
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

// Config
import googleAuthConfig from "./config/google.config";
//import routeConfig from "./config/route.config";

// API
import Auth from "./API/Auth";

// Database Connections
import ConnectDB from "./database/connections";

const mischief = express();

mischief.use(express.json());
mischief.use(express.urlencoded({ extended : false }));
mischief.use(cors());
mischief.use(helmet());

mischief.use(
    session({
      secret: "MischiefManagedSecret",
      resave: true,
      saveUninitialized: true
    })
  );

mischief.use(passport.initialize());
mischief.use(passport.session());

// Passport config
googleAuthConfig(passport);
//routeConfig(passport);

// Application Routes 
// localhost:5000

mischief.use("/auth", Auth);

mischief.get("/", (req, res) => res.json({ message : "Setup Success! Yay!!" }));

mischief.listen(5000 , () => 
    ConnectDB().then(() => console.log("Server is up and running"))
    .catch(() => console.log("DB Connection failed"))
);