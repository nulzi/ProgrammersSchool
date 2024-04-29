const express = require("express");
const app = express();

// GET + '/'
app.get("/", function (req, res) {
  res.send("Hello World");
});

let nodejsBook = {
  title: "Node.js를 공부해보자",
  price: 20000,
  description: "이 책을 활용하면 Node.js를 마스터 할 수 있음",
};

app.get("/products/1", function (req, res) {
  res.send("Node.js를 공부해보자");
  res.send(20000);
});

app.listen(1234);
