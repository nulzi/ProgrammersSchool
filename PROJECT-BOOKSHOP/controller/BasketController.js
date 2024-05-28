const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addBasket = (req, res) => {
  const { bookId, quantity, userId } = req.body;
  const sql = `INSERT INTO baskets (book_Id, quantity, user_id) VALUES (?,?,?)`;
  const values = [bookId, quantity, userId];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    // 장바구니 담기
    res.status(StatusCodes.OK).json({
      message: "장바구니 담기 success",
    });
  });
};

const getBasketList = (req, res) => {
  const { userId, selected } = req.body;
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

    if (results.length) {
      // 장바구니 조회
      return res.status(StatusCodes.OK).json(results);
    }

    res.status(StatusCodes.NOT_FOUND).end();
  });
};

const removeBasket = (req, res) => {
  const { basketId } = req.params;
  const { userId } = req.body;
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
