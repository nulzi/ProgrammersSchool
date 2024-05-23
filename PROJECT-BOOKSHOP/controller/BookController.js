const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getBookList = (req, res) => {
  const { categoryId, isNew } = req.query;
  let sql = `SELECT *, categories.name as category_name FROM books LEFT JOIN categories ON books.category_id = categories.id`;

  if (categoryId) {
    // 카테고리별 책 목록 조회
    sql += ` WHERE category_id = ?`;
    return mariadb.query(sql, categoryId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length) {
        return res.status(StatusCodes.OK).json(results);
      }

      res.status(StatusCodes.NOT_FOUND).end();
    });
  }

  // 전체 책 목록 조회
  mariadb.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(200).json(results);
  });
};

const getBook = (req, res) => {
  const { bookId } = req.params;
  const sql = `SELECT *, categories.name as category_name FROM books LEFT JOIN categories ON books.category_id = categories.id WHERE books.id = ?`;

  mariadb.query(sql, bookId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const book = results[0];

    if (book) {
      // 개별 책 조회
      return res.status(200).json(book);
    }

    res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = { getBookList, getBook };
