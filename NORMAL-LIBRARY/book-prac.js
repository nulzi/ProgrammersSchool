const express = require("express");
const app = express();

app.listen(3000);
app.use(express.json());

let db = new Map();

app
  .route("/books")
  .get((req, res) => {
    if (db.size) {
      const bookArr = [];

      db.forEach((v) => {
        bookArr.push(v);
      });

      res.status(200).json(bookArr);
    } else {
      res.status(404).json({
        message: `there is no book`,
      });
    }
  })
  .post((req, res) => {
    const { bookName } = req.body;

    if (bookName) {
      let flag = true;
      for (let book of db.values()) {
        if (book.bookName === bookName) {
          flag = !flag;
          res.status(403).json({
            message: `this book is already registered`,
          });
          break;
        }
      }
      if (flag) {
        db.set(db.size + 1, req.body);

        res.status(201).json({
          message: `add new book ${bookName}`,
        });
      }
    } else {
      res.status(400).json({
        message: `plz enter book name`,
      });
    }
  });

app
  .route("/books/:id")
  .get((req, res) => {
    const { id } = req.params;
    const book = db.get(parseInt(id));

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        message: `there is no id:${id} book`,
      });
    }
  })
  .put((req, res) => {
    const { bookName } = req.body;
    const { id } = req.params;
    const before = db.get(parseInt(id));

    if (!before) {
      res.status(404).json({
        message: `there is no id:${id} book`,
      });
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
      res.status(404).json({
        message: `there is no id:${id} book`,
      });
    }
  });
