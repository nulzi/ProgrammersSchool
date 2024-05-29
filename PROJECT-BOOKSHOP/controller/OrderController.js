const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const order = (req, res) => {
  const {
    basketItems,
    delivery,
    totalQuantity,
    totalPrice,
    firstBookTitle,
    userId,
  } = req.body;
  let sql = `INSERT INTO delivery (address, receiver, ph_num) VALUES (?,?,?)`;
  let values = [delivery.address, delivery.receiver, delivery.ph_num];
  // let deliveryId;
  // let orderId;

  // mariadb.query(sql, values, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end();
  //   }

  //   deliveryId = results.insertId;
  //   // 결제하기
  //   res.status(StatusCodes.OK).json(results);
  // });

  // sql = `INSERT INTO orders (delivery_id, book_title, total_price, total_quantity, user_id)
  // VALUES (?)`;
  // values = [deliveryId, firstBookTitle, totalPrice, totalQuantity, userId];
  // sql = `INSERT INTO orders SET ?`;
  // values = {
  //   delivery_id: 2, //deliveryId
  //   book_title: firstBookTitle,
  //   total_price: totalPrice,
  //   total_quantity: totalQuantity,
  //   user_id: userId,
  // };
  // mariadb.query(sql, values, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end();
  //   }
  //   orderId = results.insertId;
  //   // 결제하기
  //   res.status(StatusCodes.OK).json(results);
  // });

  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  values = [];

  basketItems.forEach((item) => {
    values.push([2, item.bookId, item.quantity]);
  });

  mariadb.query(sql, [values], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    // 결제하기
    res.status(StatusCodes.OK).json(results);
  });
};

const getOrderList = (req, res) => {
  const sql = ``;
  const values = [];

  mariadb.query(sql, (err, results) => {
    // 주문 실제 목록 조회
    res.status(StatusCodes.OK).json({
      message: "주문 실제 목록 조회 success",
    });
  });
};

const getOrderDetail = (req, res) => {
  const sql = ``;
  const values = [];

  mariadb.query(sql, (err, results) => {
    // 주문 상세 상품 조회
    res.status(StatusCodes.OK).json({
      message: "주문 상세 상품 조회 success",
    });
  });
};

module.exports = { order, getOrderList, getOrderDetail };
