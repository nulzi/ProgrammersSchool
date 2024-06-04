// Get the client
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.DBPORT,
  user: process.env.USER,
  password: process.env.PW,
  database: process.env.DATABASE,
  dateStrings: true,
  multipleStatements: true,
});

module.exports = connection;
