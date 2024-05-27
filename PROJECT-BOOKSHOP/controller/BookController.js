const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getBookList = (req, res) => {
  const { categoryId, isNew, limit, pages } = req.query;
  let sql = `SELECT *,
  (SELECT name FROM categories WHERE id = books.category_id) AS category_name,
  (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes
  FROM books`;
  const offset = limit * (pages - 1);
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

  if (limit && pages) {
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);
  }

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    }

    res.status(StatusCodes.NOT_FOUND).end();
  });
};

const getBook = (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;
  const sql = `SELECT *, 
  (SELECT name FROM categories WHERE id = books.category_id) AS category_name,
  (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes,
  (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS is_like
  FROM books WHERE books.id = ?`;
  const values = [userId, bookId, bookId];

  mariadb.query(sql, values, (err, results) => {
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
};

module.exports = { getBookList, getBook };
