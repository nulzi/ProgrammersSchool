// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "Library",
  dateStrings: true,
});

// A simple SELECT query
connection.query("SELECT * FROM `librarians`", function (err, results, fields) {
  console.log(results);
});

// Using placeholders
// connection.query(
//   "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
//   ["Page", 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
