const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();

router
  .route("/")
  .get((req, res) => {
    const { userId } = req.body;
    if (db.size && userId) {
      const bookArr = [];

      db.forEach((v) => {
        if (v.userId === userId) bookArr.push(v);
      });
      if (bookArr.length) {
        res.status(200).json(bookArr);
      } else {
        notFoundRes(res, `there is empty`);
      }
    } else {
      notFoundRes(res, `there is no book`);
    }
  })
  .post((req, res) => {
    const { bookName, userId } = req.body;

    if (bookName && userId) {
      let isNewBook = true;
      for (let book of db.values()) {
        if (book.bookName === bookName) {
          isNewBook = !isNewBook;
          res.status(403).json({
            message: `this book is already registered`,
          });
          break;
        }
      }
      if (isNewBook) {
        db.set(db.size + 1, req.body);

        res.status(201).json({
          message: `add new book ${bookName}`,
        });
      }
    } else {
      res.status(400).json({
        message: `plz enter book name & userId`,
      });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const book = db.get(parseInt(id));

    if (book) {
      res.status(200).json(book);
    } else {
      notFoundRes(res, `there is no id:${id} book`);
    }
  })
  .put((req, res) => {
    const { bookName } = req.body;
    const { id } = req.params;
    const before = db.get(parseInt(id));

    if (!before) {
      notFoundRes(res, `there is no id:${id} book`);
    } else if (before.bookName === bookName) {
      res.status(400).json({
        message: `there is no change`,
      });
    } else {
      db.set(parseInt(id), req.body);

      res.status(200).json({
        message: `change before: ${before.bookName} after: ${bookName}`,
      });
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const removed = db.get(parseInt(id));

    if (db.delete(parseInt(id))) {
      res.status(200).json({
        message: `delete ${removed.bookName} book`,
      });
    } else {
      notFoundRes(res, `there is no id:${id} book`);
    }
  });

function notFoundRes(res, message) {
  res.status(404).json({
    message: message,
  });
}

module.exports = router;
