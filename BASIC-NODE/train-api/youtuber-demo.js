const express = require("express");
const app = express();

app.listen(1234);

let youtuber1 = {
  id: "youtuber1",
  sub: 2000000,
  videoNum: "600개",
};

let youtuber2 = {
  id: "youtuber2",
  sub: 1000000,
  videoNum: "6600개",
};

let youtuber3 = {
  id: "youtuber3",
  sub: 25600000,
  videoNum: "1600개",
};

let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.get("/youtuber/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);
  if (db.has(id)) {
    res.json(youtuber);
  } else {
    res.json({
      message: "there is no data",
    });
  }
});
