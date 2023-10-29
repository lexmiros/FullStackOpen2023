const bcrypt = require("bcrypt")
const User = require("../models/user")
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User( {username: "root", passwordHash} )

    await user.save()
})

test("Test should not create a second user with exisint username", async () => {
    const user = {
        username: 'root',
        name: 'Matti Luukkainen',
        password: 'salainen',
    }

    const usersBeforePost = helper.usersInDb()
    const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    const usersAfterPost = helper.usersInDb()
    
    expect(result.body.error).toContain("expected `username` to be unique")
    expect(usersBeforePost).toEqual(usersAfterPost)
})

test("Test should create a new user", async () => {
    const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

    const usersBeforePost = await helper.usersInDb()

    await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
    
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(usersBeforePost.length + 1)

    const usernames = usersAfterPost.map(user => user.username)
    expect(usernames).toContain("mluukkai")
})

afterAll(async () => {
    await mongoose.connection.close()
})