const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
   const blogs = await Blog.find({})
   response.status(200).json(blogs)
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const postedBlog = await newBlog.save()
    response.status(201).json(postedBlog)
})

module.exports = blogsRouter