const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { decodeUser } = require("../authorization");
const jwt = require("jsonwebtoken");

const addLike = (req, res) => {
  const { bookId } = req.params;
  const userId = decodeUser(req).userId;

  if (userId instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션 만료됨.",
    });
  } else if (userId instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "토큰이 이상합니다. 확인해주세요",
    });
  }

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
  const userId = decodeUser(req).userId;

  if (userId instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션 만료됨.",
    });
  } else if (userId instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "토큰이 이상합니다. 확인해주세요",
    });
  }

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
