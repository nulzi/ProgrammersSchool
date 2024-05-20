const express = require("express");
const router = express.Router();

router.use(express.json());

router
  .route("/")
  .post((req, res) => {
    // 장바구니 담기
    res.status(200).json({
      message: "장바구니 담기 success",
    });
  })
  .get((req, res) => {
    // 장바구니 예상 목록 조회
    const { isChosen } = req.query;
    if (isChosen) {
      return res.status(200).json({
        message: "장바구니 예상 목록 조회 success",
      });
    }
    // 장바구니 조회
    res.status(200).json({
      message: "장바구니 조회 success",
    });
  });

// 장바구니 개별 삭제
router.delete("/:basketId", (req, res) => {
  res.status(200).json({
    message: "장바구니 개별 삭제 success",
  });
});

module.exports = router;
