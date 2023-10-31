const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Username required"], 
    unique: [true, "Username must be unique"],
    minLength: [3, "Username must be greater than 3 characters"] 
  },
  name: { 
    type: String
  },
  passwordHash: { 
    type: String, 
    required: [true, "Password required"],
    minLength: [3, "Password must be greater than 3 characters"] 
  },
});

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
