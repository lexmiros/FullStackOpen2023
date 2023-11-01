require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const MONGO_DB_URI =
  process.env.NODE_ENV !== "production"
    ? process.env.MONGO_DB_TEST_URI
    : process.env.MONGO_DB_URI;

module.exports = {
  PORT,
  SECRET,
  MONGO_DB_URI
};
