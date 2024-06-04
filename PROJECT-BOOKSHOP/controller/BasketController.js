const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { decodeUser } = require("../authorization");
const jwt = require("jsonwebtoken");

const addBasket = (req, res) => {
  const { bookId, quantity } = req.body;
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

  const sql = `INSERT INTO baskets (book_Id, quantity, user_id) VALUES (?,?,?)`;
  const values = [bookId, quantity, userId];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    // 장바구니 담기
    res.status(StatusCodes.OK).end();
  });
};

const getBasketList = (req, res) => {
  const { selected } = req.body;
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

  let sql = `SELECT baskets.id, book_id, title, summary, quantity, price
    FROM baskets LEFT JOIN books ON baskets.book_id = books.id WHERE user_id = ?`;
  const values = [userId];

  if (selected) {
    // 장바구니 예상 목록 조회
    sql += ` AND baskets.id IN (?)`;
    values.push(selected);
  }

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (selected && results.length == selected.length) {
      return res.status(StatusCodes.OK).json(results);
    } else if (results.length) {
      // 장바구니 조회
      return res.status(StatusCodes.OK).json(results);
    }

    res.status(StatusCodes.NOT_FOUND).end();
  });
};

const removeBasket = (req, res) => {
  const { basketId } = req.params;
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

  const sql = `DELETE FROM baskets WHERE id = ? AND user_id = ?`;
  const values = [basketId, userId];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows) {
      return res.status(StatusCodes.OK).json({
        message: "장바구니 개별 삭제 success",
      });
    }

    res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

module.exports = { addBasket, getBasketList, removeBasket };
