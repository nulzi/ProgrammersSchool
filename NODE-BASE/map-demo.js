const express = require("express");
const app = express();

app.listen(1234);

app.get("/", function (req, res) {
  res.send("Hello World");
});

let db = new Map();
db.set(1, "Notebook");
db.set(2, "Cup");
db.set(3, "Chair");

console.log(db);
console.log(db.get(1));

app.get("/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  if (db.has(id))
    res.json({
      id: id,
      productName: db.get(id),
    });
  else
    res.json({
      message: "sorry there is no data",
    });
});
