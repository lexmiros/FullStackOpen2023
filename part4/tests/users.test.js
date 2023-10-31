const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const helpers = require("./test_helpers")
const bcrypt = require("bcryptjs")

const initialUsers = helpers.initialUsers

beforeEach(async () => {
    await User.deleteMany({})

    for (const user of initialUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10)

        const newUser = new User({
           username: user.username,
           name: user.name,
           passwordHash: hashedPassword
        })

        await newUser.save()
    }
})

test("Test should get the three default users set before each test", async () => {
    const users = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    expect(users.body).toHaveLength(initialUsers.length)

})

test("User with existing username should NOT be added", async () => {
    const currentUser = initialUsers[0]

    const newUser = {
        username: currentUser.username,
        name: currentUser.name,
        password: currentUser.password
    }

    const usersBeforePost = await helpers.getAllUsers()

    await api
        .post("/api/users")
        .send(newUser)
        .expect(400)

    const usersAfterPost = await helpers.getAllUsers()

    expect(usersBeforePost).toHaveLength(usersAfterPost.length)
    
})

test("Valid user should be added", async () => {
    const newUser = {
        username: "newuser123",
        name: "New User",
        password: "Newuserpassword123"
    }

    const usersBeforePost = await helpers.getAllUsers()

    await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const usersAfterPost = await helpers.getAllUsers()

    expect(usersAfterPost).toHaveLength(usersBeforePost.length + 1)
})
afterAll(async () => {
    mongoose.connection.close()
})