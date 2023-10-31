const bcrypt = require("bcryptjs")
const User = require("../models/user")
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({});
    const users = helper.initialUsers

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10)

        const userObject = new User({
            username: user.username,
            name: user.name,
            passwordHash: hashedPassword
        })

        await userObject.save()
    }
});

test("Test should not create a second user with existing username", async () => {
    const user = {
        username: 'root',
        name: 'Matti Luukkainen',
        password: 'salainen',
    }

    const usersBeforePost = await helper.usersInDb()
    
    const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    const usersAfterPost = await helper.usersInDb()
    
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