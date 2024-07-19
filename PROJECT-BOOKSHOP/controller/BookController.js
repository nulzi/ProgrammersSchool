const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { decodeUser } = require("../authorization");
const jwt = require("jsonwebtoken");

const getBookList = (req, res) => {
  const { categoryId, isNew, limit, currentPage } = req.query;
  let sql = `SELECT *,
  (SELECT name FROM categories WHERE id = books.category_id) AS category_name,
  (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes
  FROM books`;
  const offset = limit * (currentPage - 1);
  const values = [];

  if (categoryId && isNew) {
    sql += ` WHERE category_id = ? AND published_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW()`;
    values.push(categoryId);
  } else if (categoryId) {
    sql += ` WHERE category_id = ?`;
    values.push(categoryId);
  } else if (isNew) {
    sql += ` WHERE published_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW()`;
  }

  if (limit && currentPage) {
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);
  }
  sql = mariadb.format(sql, values);
  sql += `; SELECT count(*) FROM books;`;

  mariadb.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results[0].length && results[1].length) {
      return res.status(StatusCodes.OK).json({
        books: results[0],
        pagination: {
          total_page: Math.ceil(results[1][0]["count(*)"] / limit),
          current_page: parseInt(currentPage),
        },
      });
    }

    res.status(StatusCodes.NOT_FOUND).end();
  });
};

const getBook = (req, res) => {
  const { bookId } = req.params;
  const userId = decodeUser(req)?.userId;

  if (userId instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션 만료됨.",
    });
  } else if (userId instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "토큰이 이상합니다. 확인해주세요",
    });
  } else {
    let sql = `SELECT *, 
    (SELECT name FROM categories WHERE id = books.category_id) AS category_name,
    (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes`;
    let values = [];

    if (userId) {
      sql += `, (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS is_like`;
      values = [userId, bookId];
    }

    sql += ` FROM books WHERE books.id = ?`;
    values.push(bookId);

    return mariadb.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      const book = results[0];

      if (book) {
        return res.status(200).json(book);
      }

      res.status(StatusCodes.NOT_FOUND).end();
    });
  }
};

module.exports = { getBookList, getBook };
