const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response, next) => {
  const allUsers = await User
  .find({})
  .populate("notes", { content: 1, important: 1})
  response.status(200).json(allUsers)
})

module.exports = usersRouter