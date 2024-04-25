const express = require("express");
const app = express();

app.listen(1234);

const book1 = {
  title: "harry",
  price: 500,
  description: "who lived",
};

const book2 = {
  title: "porter",
  price: 2500,
  description: "abadacadabra!",
};

const book3 = {
  title: "him",
  price: 5500,
  description: "boldmort",
};

app.get("/:nickname", function (req, res) {
  const { nickname } = req.params;

  if (nickname == "harry") {
    res.json(book1);
  } else if (nickname == "porter") {
    res.json(book2);
  } else if (nickname == "him") {
    res.json(book3);
  } else {
    res.json({
      message: "sorry there is no data",
    });
  }
});
