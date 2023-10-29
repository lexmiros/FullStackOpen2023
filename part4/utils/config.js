require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_DB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_DB_TEST_URI
    : process.env.MONGO_DB_URI;

module.exports = {
  PORT,
  MONGO_DB_URI,
};
