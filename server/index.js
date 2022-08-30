import express from "express";
import cors from "cors";
import helmet from "helmet";


const mischief = express();

mischief.use(express.json());
mischief.use(express.urlencoded({ extended : false }));
mischief.use(cors());
mischief.use(helmet());

mischief.get("/", (req, res) => {
    res.json({ message : "Setup Success! Yay!!" })
});

mischief.listen(5000 , () => {
    console.log("Server is up and running")
});



