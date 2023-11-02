const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")


blogsRouter.get("/", async (request, response, next) => {
   const blogs = await Blog
    .find({})
    .populate("user", {username: 1, name: 1, id: 1})
   response.status(200).json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, config.SECRET)
 
    if (!decodedToken.id) {
        return response.status(401).json({error: "Invalid tokensdfc"})
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const postedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(postedBlog.id)
    await user.save()
    
    response.status(201).json(postedBlog)
})

blogsRouter.delete("/:id", async (request, response, next) => {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json(deletedBlog)
});

blogsRouter.put("/:id", async (request, response, next) => {
    const newBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id ,newBlog)
    response.json(newBlog)
})

module.exports = blogsRouter