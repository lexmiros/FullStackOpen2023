const User = require("../models/user")
const userRouter = require("express").Router()
const bcrypt = require("bcryptjs")

userRouter.post("/", async (request, response, next) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        response.status(400).json({error: "Password must be at least 3 characters"})
        return
    }

    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get("/", async (request, response, next) => {
    const users = await User
        .find({})
        .populate("blogs", {url: 1, title: 1, author: 1, id: 1})
    response.status(200).json(users)
})

module.exports = userRouter