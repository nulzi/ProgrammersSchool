const express = require("express");
const router = express.Router();
const {
  order,
  getOrderList,
  getOrderDetail,
} = require("../controller/OrderController");
router.use(express.json());

// 회원가입
router.route("/").post(order).get(getOrderList);

router.get("/:orderId", getOrderDetail);

module.exports = router;
