const express = require("express");
const app = express();
app.listen(3000);

const products = [
  { id: 1, name: "monitor" },
  { id: 2, name: "mouse" },
  { id: 3, name: "keyboard" },
  { id: 4, name: "ssd" },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  let { id } = req.params;
  const product = products.find((product) => product.id === parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).send(`there is no product id ${id} in database`);
  }
});
