const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const token = jwt.sign({ name: "nulzi" }, process.env.PRIVATE_KEY);
console.log(token);

const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);
