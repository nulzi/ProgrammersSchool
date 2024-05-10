const express = require("express");
const router = express.Router();
const mariadb = require("../mariadb");

router.use(express.json());

router
  .route("/")
  .get((req, res) => {
    const { librarianId } = req.body;

    if (librarianId) {
      const sql = "SELECT * FROM books WHERE librarian_id = ?";

      mariadb.query(sql, librarianId, (_, results) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundRes(res, `there is empty`);
        }
      });
    } else {
      res.status(400).json({
        message: `plz enter the librarian_id`,
      });
    }
  })
  .post((req, res) => {
    const { name, publisher, publishDate, librarianId } = req.body;

    if (name && librarianId) {
      const sql =
        "INSERT INTO books (name, publisher, publish_date, librarian_id) VALUES (?,?,?,?)";
      const values = [name, publisher, publishDate, librarianId];

      mariadb.query(sql, values, (err) => {
        // Q. 책 테이블에는 유니크한 값이 없어서 중복을 확인할 수 없다
        // if (err) {
        //   res.status(403).json({
        //     message: `this book is already registered`,
        //   });
        // } else {
        if (err?.code === "ER_NO_REFERENCED_ROW_2") {
          notFoundRes(res, `there is no librarian ${librarianId}`);
        } else {
          res.status(201).json({
            message: `add new book ${name}`,
          });
        }
        // }
      });
    } else {
      res.status(400).json({
        message: `plz enter body data`,
      });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM books WHERE id = ?";

    mariadb.query(sql, id, (_, results) => {
      const book = results[0];

      if (book) {
        res.status(200).json(book);
      } else {
        notFoundRes(res, `there is no id:${id} book`);
      }
    });
  })
  .put((req, res) => {
    const { bookName, publisher, publishDate, librarianId } = req.body;
    const { id } = req.params;
    const sql =
      "UPDATE books SET name = ?, publisher = ?, publish_date = ?, librarian_id = ? WHERE id = ?";
    const values = [
      bookName,
      publisher,
      publishDate,
      librarianId,
      parseInt(id),
    ];
    // Q. update시 필요없는 값을 그냥 빈 값으로 보내면 오류가 나는데 sql문을 각각 만들어줘야하나? 그러면 8가지로 너무 많은데...
    // A1. 동적으로 필요한 경우에 맞게 sql을 추가해 나가는 방식
    mariadb.query(sql, values, (err, results) => {
      console.log(err);
      console.log(results);
    });
    // const before = db.get(parseInt(id));

    // if (!before) {
    //   notFoundRes(res, `there is no id:${id} book`);
    // } else if (before.bookName === bookName) {
    //   res.status(400).json({
    //     message: `there is no change`,
    //   });
    // } else {
    //   db.set(parseInt(id), req.body);

    //   res.status(200).json({
    //     message: `change before: ${before.bookName} after: ${bookName}`,
    //   });
    // }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM books WHERE id = ?";

    mariadb.query(sql, id, (_, results) => {
      if (results.affectedRows) {
        res.status(200).json({
          message: `delete ${id} book`,
        });
      } else {
        notFoundRes(res, `there is no id:${id} book or already delete`);
      }
    });
  });

function notFoundRes(res, message) {
  res.status(404).json({
    message: message,
  });
}

module.exports = router;
