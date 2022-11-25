import express from "express"

// Database
import { BlogModel } from "../../database/allModels";

const Router = express.Router();

/*
Route            /new
Des              Add new blog
Access           Public
Method           POST
*/

Router.post('/new', async(req, res) => {
    try {
        const { BlogData } = req.body;
        const newBlog = await BlogModel.create(BlogData);
        return res.status(201).json({ blog : newBlog });
    } catch(error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /my-blogs/:_id
Des              View Blogs posted by a user
Access           Public
Method           GET
*/

Router.get('/my-blogs/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const blogs = await BlogModel.find({ user : _id })
        return res.status(200).json({ blogs : blogs })
    } catch(error) {
        res.status(500).json({ error : error.message })
    }
});

/*
Route            /top-blogs
Des              Get random blogs to dipslay on landing page
Access           Public
Method           GET
*/

Router.get('/top-blogs', async(req, res) => {
    try {
        const blogs = await BlogModel.aggregate([{ $sample : { size : 5 } }])
        res.status(200).json({ randomBlogs : blogs })
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
});

export default Router;