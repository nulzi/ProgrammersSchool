const express = require("express");
const router = express.Router();
const mariadb = require("../mariadb");
const { body, param, validationResult } = require("express-validator");

router.use(express.json());

const validate = (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }
};

router
  .route("/")
  .get(
    body("librarianId")
      .notEmpty()
      .withMessage(`plz enter the librarian_id(int)`)
      .isInt()
      .withMessage(`librarian id type is int. plz check your input`),
    (req, res) => {
      const err = validationResult(req);
      const { librarianId } = req.body;

      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }
      const sql = "SELECT * FROM books WHERE librarian_id = ?";

      mariadb.query(sql, librarianId, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.length) {
          return res.status(200).json(results);
        }
        notFoundRes(res, `there is empty`);
      });
    }
  )
  .post(
    [
      body("librarianId")
        .notEmpty()
        .withMessage(`plz enter the librarian_id(int)`)
        .isInt()
        .withMessage(`librarian id type is int. plz check your input`),
      body("name")
        .notEmpty()
        .withMessage(`plz enter the name(string)`)
        .isString()
        .withMessage(`name type is string. plz check your input`),
    ],
    (req, res) => {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(400).json(err.array());
      }

      const { name, publisher, publishDate, librarianId } = req.body;

      const sql =
        "INSERT INTO books (name, publisher, publish_date, librarian_id) VALUES (?,?,?,?)";
      const values = [name, publisher, publishDate, librarianId];

      return mariadb.query(sql, values, (err) => {
        // Q. 책 테이블에는 유니크한 값이 없어서 중복을 확인할 수 없다
        // if (err) {
        //   res.status(403).json({
        //     message: `this book is already registered`,
        //   });
        // } else {
        if (err?.code === "ER_NO_REFERENCED_ROW_2") {
          return notFoundRes(res, `there is no librarian ${librarianId}`);
        }
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json({
          message: `add new book ${name}`,
        });
        // }
      });
    }
  );

router
  .route("/:id")
  .get(param("id").notEmpty().withMessage("need book id"), (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json(err.array());
    }

    const { id } = req.params;
    const sql = "SELECT * FROM books WHERE id = ?";

    mariadb.query(sql, id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      const book = results[0];

      if (book) {
        return res.status(200).json(book);
      }
      notFoundRes(res, `there is no id:${id} book`);
    });
  })
  .put(
    [
      param("id").notEmpty().withMessage("need book id"),
      body("bookName")
        .notEmpty()
        .withMessage(`plz enter the book name(string)`)
        .isString()
        .withMessage(`book name type is string. plz check your input`),
      validate,
    ],
    (req, res) => {
      const { id } = req.params;
      /* 모든 컬럼 업데이트
      // const { bookName, publisher, publishDate, librarianId } = req.body;
      // const sql =
      //   "UPDATE books SET name = ?, publisher = ?, publish_date = ?, librarian_id = ? WHERE id = ?";
      // const values = [
      //   bookName,
      //   publisher,
      //   publishDate,
      //   librarianId,
      //   parseInt(id),
      // ];
      // Q. update시 필요없는 값을 그냥 빈 값으로 보내면 오류가 나는데 sql문을 각각 만들어줘야하나? 그러면 8가지로 너무 많은데...
      // A1. 동적으로 필요한 경우에 맞게 sql을 추가해 나가는 방식 */

      // 추가할 수 있는 기능
      // 1. select로 이전 데이터 가져오기. 기존 이름과 동일한 경우 업데이트 안 하기
      // 2. 모든 컬럼 업데이트

      //이름만 업데이트하는 경우
      const { bookName } = req.body;
      const sql = "UPDATE books SET name = ? WHERE id = ?";
      const values = [bookName, id];

      mariadb.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.affectedRows) {
          return res.status(200).json({
            message: `book ${id} change name => ${bookName}`,
          });
        }
        notFoundRes(res, `change nothing`);
      });
    }
  )
  .delete(
    [param("id").notEmpty().toInt().withMessage("need book id"), validate],
    (req, res) => {
      const { id } = req.params;
      const sql = "DELETE FROM books WHERE id = ?";

      mariadb.query(sql, id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.affectedRows) {
          return res.status(200).json({
            message: `delete ${id} book`,
          });
        }
        notFoundRes(res, `there is no id:${id} book or already delete`);
      });
    }
  );

function notFoundRes(res, message) {
  res.status(404).json({
    message: message,
  });
}

module.exports = router;
