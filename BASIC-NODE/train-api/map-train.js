const express = require("express");
const app = express();

app.listen(1234);

app.get("/", function (req, res) {
  res.send("Hello World");
});

let db = new Map();

let book = {
  productName: "book",
  price: 2000000,
};

let air = {
  productName: "air",
  price: 2000000,
};

let table = {
  productName: "table",
  price: 1500000,
};

let mouse = {
  productName: "mouse",
  price: 2670000,
};

db.set(1, book);
db.set(2, air);
db.set(3, table);
db.set(4, mouse);

console.log(db);
console.log(db.get(1));

app.get("/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  if (db.has(id)) {
    // res.json({
    //   id: id,
    //   ...db.get(id),
    // });
    const product = db.get(id);
    product[id] = id; // product.id = id;

    res.json(product);
  } else
    res.json({
      message: "sorry there is no data",
    });
});
