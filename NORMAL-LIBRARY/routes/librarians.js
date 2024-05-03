const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();

router.get("/", (req, res) => {
  res.send("Main");
});

// login
router.post("/login", (req, res) => {
  const { userId, pw } = req.body;
  const user = db.get(userId);

  // id와 pw를 틀린 경우를 따로 알려줄 경우 id의 존재 여부를
  // 확인할 수 있어서 따로 알려줄 필요가 없다.
  if (user && user.pw === pw) {
    res.status(201).json({
      message: `Have a nice day ${user.name}`,
    });
  } else {
    res.status(400).json({
      message: `Not our librarian. plz sign up first or Wrong id, pw. plz check your id, pw`,
    });
  }
});

// sign up
router.post("/signup", (req, res) => {
  const { userId, pw, name } = req.body;
  const user = db.get(userId);

  if (user) {
    res.status(403).json({
      message: `already exist id plz use other id`,
    });
  } else if (userId && pw && name) {
    db.set(userId, req.body);
    res.status(201).json({
      message: `Welcome new librarian ${db.get(userId).name}`,
    });
  } else {
    res.status(400).json({
      message: `plz enter all data id, pw, name`,
    });
  }
});

router
  .route("/librarians")
  .get((req, res) => {
    let { userId } = req.body;
    const user = db.get(userId);

    if (user) {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    } else {
      res.status(400).json({
        message: `there is no ${userId} librarian`,
      });
    }
  })
  .delete((req, res) => {
    let { userId } = req.body;
    const before = db.get(userId);

    if (db.delete(userId)) {
      res.status(200).json({
        message: `goodbye ${before.name}`,
      });
    } else {
      res.status(400).json({
        message: `there is no ${userId} librarian or already leave out library`,
      });
    }
  });

module.exports = router;
