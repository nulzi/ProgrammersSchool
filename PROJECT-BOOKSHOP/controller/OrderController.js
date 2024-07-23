const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { decodeUser } = require("../authorization");
const jwt = require("jsonwebtoken");

const order = async (req, res) => {
  const catchError = (error) => {
    res.status(StatusCodes.BAD_REQUEST).end();
    throw error;
  };
  const { basketItemIds, delivery, totalQuantity, totalPrice, firstBookTitle } =
    req.body;
  const mariadbP = require("mysql2/promise");
  const conn = await mariadbP.createConnection({
    host: "localhost",
    port: process.env.DBPORT,
    user: process.env.USER,
    password: process.env.PW,
    database: process.env.DATABASE,
    dateStrings: true,
  });
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

  let values = [delivery.address, delivery.receiver, delivery.ph_num];
  let results = await addDelivery(conn, values).catch(catchError);
  let deliveryId = results.insertId;

  values = [deliveryId, firstBookTitle, totalPrice, totalQuantity, userId];
  results = await addOrder(conn, values).catch(catchError);

  let orderId = results.insertId;

  sql = `SELECT book_id, quantity FROM baskets WHERE id IN (?)`;

  let [basketItems] = await conn.query(sql, [basketItemIds]).catch(catchError);

  values = [];
  basketItems.forEach((item) => {
    values.push([orderId, item.book_id, item.quantity]);
  });
  results = await addOrderedBook(conn, values).catch(catchError);
  results = await deleteSelectedBaskets(conn, basketItemIds)
    .then((result) => {
      if (!result.affectedRows)
        return res.status(StatusCodes.BAD_REQUEST).end();
    })
    .catch(catchError);

  res.status(StatusCodes.OK).json(results);
};

const addDelivery = async (conn, values) => {
  const sql = `INSERT INTO delivery (address, receiver, ph_num) VALUES (?,?,?)`;
  const [results] = await conn.execute(sql, values);
  return results;
};

const addOrder = async (conn, values) => {
  const sql = `INSERT INTO orders (delivery_id, book_title, total_price, total_quantity, user_id) VALUES (?,?,?,?,?)`;
  // sql = `INSERT INTO orders SET ?`;
  // values = {
  //   delivery_id: 2, //deliveryId
  //   book_title: firstBookTitle,
  //   total_price: totalPrice,
  //   total_quantity: totalQuantity,
  //   user_id: userId,
  // };
  const [results] = await conn.execute(sql, values);

  return results;
};

const addOrderedBook = async (conn, values) => {
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  const [results] = await conn.query(sql, [values]);

  return results;
};

const deleteSelectedBaskets = async (conn, values) => {
  const sql = `DELETE FROM baskets WHERE id IN (?)`;
  const [results] = await conn.query(sql, [values]);

  return results;
};

const getOrderList = (req, res) => {
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

  const sql = `SELECT orders.id, created_at, address, receiver, ph_num, book_title, total_quantity, total_price
  FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id WHERE user_id = ?`;

  mariadb.query(sql, userId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    // 주문 실제 목록 조회
    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    }
    res.status(StatusCodes.NOT_FOUND).end();
  });
};

const getOrderDetail = (req, res) => {
  console.log("getOrderDetail");
  const { orderId } = req.params;
  const user = decodeUser(req);

  if (user instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션 만료됨.",
    });
  } else if (user instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "토큰이 이상합니다. 확인해주세요",
    });
  }

  if (user) {
    const sql = `SELECT book_id, title, img, price, author, quantity
    FROM orderedBook LEFT JOIN books ON book_id = books.id WHERE order_id = ?`;

    return mariadb.query(sql, orderId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      // 주문 상세 상품 조회
      if (results.length) {
        return res.status(StatusCodes.OK).json(results);
      }
      res.status(StatusCodes.NOT_FOUND).end();
    });
  }

  res.status(StatusCodes.UNAUTHORIZED).end();
};

module.exports = { order, getOrderList, getOrderDetail };
