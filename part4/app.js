const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")

const app = express()

mongoose.set("strictQuery", false)


logger.info("Connecting to MongoDb")

mongoose.connect(config.MONGO_DB_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        longger.info(`Could not connect to Mongo Db : ${error}`)
    })

app.use(cors())
//app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/blogs", blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

