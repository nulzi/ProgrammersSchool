const express = require("express");
const app = express();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

app.listen(process.env.PORT);

app.get("/gen", (req, res) => {
  const token = jwt.sign({ name: "nulzi" }, process.env.PRIVATE_KEY);
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.status(200).end();
});

app.get("/verify", (req, res) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  const decoded = jwt.verify(authorization, process.env.PRIVATE_KEY);
  console.log(decoded);
  res.status(200).end();
});
