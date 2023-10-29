require("dotenv").config()
const mongoose = require("mongoose")
const url = process.env.MONGO_DB_URI

mongoose.connect(url).then(result => {
    console.log("Connected to MongoDB")
})
.catch((error) => {
    console.log(`Error connecting to MongoDb :  ${error}`)
})

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [3, "Name must be 3 characters or longer"],
      required: [true, "A name is required"]
    },
    number: {
      type: String,
      minLength: [8, "Number must be 8 characters or longer"],
      validate: [
        function(v) {
          return /^\d{2,3}-\d+$/.test(v)
        },
        "Number must be of form 123-23124321"
      ],
      required: [true, "A phone number is required"]
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Person", personSchema)