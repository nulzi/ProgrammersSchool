const express = require("express");
const app = express();

app.listen(3000);
app.use(express.json());

let db = new Map();

app.get("/", (req, res) => {
  res.send("Main");
});

// login
app.post("/login", (req, res) => {
  const { id, pw } = req.body;
  const user = db.get(id);

  if (user) {
    res.status(201).json({
      message: `Have a nice day ${user.name}`,
    });
  } else {
    res.status(400).json({
      message: `not our librarian. plz sign up first`,
    });
  }
});

// sign up
app.post("/signup", (req, res) => {
  const { id, pw, name } = req.body;
  const user = db.get(id);

  if (user) {
    res.status(403).json({
      message: `already exist id plz use other id`,
    });
  } else if (id && pw && name) {
    db.set(id, req.body);
    res.status(201).json({
      message: `Welcome new librarian ${db.get(id).name}`,
    });
  } else {
    res.status(400).json({
      message: `plz enter all data id, pw, name`,
    });
  }
});

// select
app.get("/librarians/:id", (req, res) => {
  let { id } = req.params;
  parseInt(id);
  const user = db.get(id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
    });
  } else {
    res.status(400).json({
      message: `there is no ${id} librarian`,
    });
  }
});

// delete
app.delete("/librarians/:id", (req, res) => {
  let { id } = req.params;
  parseInt(id);
  const before = db.get(id);

  if (db.delete(id)) {
    res.json({
      message: `goodbye ${before.name}`,
    });
  } else {
    res.status(400).json({
      message: `there is no ${id} librarian or already leave out library`,
    });
  }
});
