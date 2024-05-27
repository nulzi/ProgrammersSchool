const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;
  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)`;
  const values = [userId, bookId];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows) {
      // 좋아요
      return res.status(StatusCodes.OK).json({
        message: "좋아요 success",
      });
    }

    res.status(StatusCodes.BAD_REQUEST).end();
  });
};

const cancelLike = (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;
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

module.exports = { addLike, cancelLike };
