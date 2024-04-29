const express = require("express");
const app = express();

app.listen(1234);

app.get("/products/:id", function (req, res) {
  res.json({
    num: req.params.id,
  });
});
