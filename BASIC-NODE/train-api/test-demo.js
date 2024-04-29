const express = require("express");
const app = express();

// GET + 'http://localhost:1234/test'
// 'test success'
app.get("/test", function (req, res) {
  res.send("test success");
});

// GET + 'http://localhost:1234/test/1'
// 'one!!'
app.get("/test/1", function (req, res) {
  res.send("one!!");
});

app.listen(1234);
