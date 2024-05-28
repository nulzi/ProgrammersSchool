const express = require("express");
const router = express.Router();
const {
  addBasket,
  getBasketList,
  removeBasket,
} = require("../controller/BasketController");

router.use(express.json());

router.route("/").post(addBasket).get(getBasketList);

// 장바구니 개별 삭제
router.delete("/:basketId", removeBasket);

module.exports = router;
