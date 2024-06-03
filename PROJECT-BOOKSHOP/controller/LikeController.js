const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const addLike = (req, res) => {
  const { bookId } = req.params;
  const userId = decodeUserId(req);
  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)`;
  const values = [userId, bookId];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    // 좋아요
    return res.status(StatusCodes.OK).json({
      message: "좋아요 success",
    });
  });
};

const cancelLike = (req, res) => {
  const { bookId } = req.params;
  const userId = decodeUserId(req);
  const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
  const values = [userId, bookId];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows) {
      // 좋아요 취소
      return res.status(StatusCodes.OK).json({
        message: "좋아요 취소 success",
      });
    }

    res.status(StatusCodes.BAD_REQUEST).end();
  });
};

const decodeUserId = (req) => {
  const token = req.headers.authorization;
  const userId = jwt.verify(token, process.env.PRIVATE_KEY).userId;

  return userId;
};

module.exports = { addLike, cancelLike };
