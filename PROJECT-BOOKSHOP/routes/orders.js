const express = require("express");
const router = express.Router();

router.use(express.json());

// 회원가입
router
  .route("/")
  .post((req, res) => {
    // 결제하기
    res.status(200).json({
      message: "결제하기 success",
    });
  })
  .get((req, res) => {
    // 주문 실제 목록 조회
    res.status(200).json({
      message: "주문 실제 목록 조회 success",
    });
  });

router.put("/:orderId", (req, res) => {
  // 주문 상세 상품 조회
  res.status(200).json({
    message: "주문 상세 상품 조회 success",
  });
});

module.exports = router;
