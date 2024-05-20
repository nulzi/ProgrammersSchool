const express = require("express");
const router = express.Router();

router.use(express.json());

router.route("/").get((req, res) => {
  // 카테고리별 책 목록 조회
  const { categoryId, isNew } = req.query;
  if (categoryId && isNew) {
    return res.status(200).json({
      message: "카테고리별 책 목록 조회 success",
    });
  }
  // 전체 책 목록 조회
  res.status(200).json({
    message: "전체 책 목록 조회 success",
  });
});

router.get("/:bookId", (req, res) => {
  // 개별 책 조회
  res.status(200).json({
    message: "개별 책 조회 success",
  });
});
module.exports = router;
