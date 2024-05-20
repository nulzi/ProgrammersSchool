const express = require("express");
const router = express.Router();

router.use(express.json());

router
  .route("/:bookId")
  .post((req, res) => {
    // 좋아요
    res.status(200).json({
      message: "좋아요 success",
    });
  })
  .delete((req, res) => {
    // 좋아요 취소
    res.status(200).json({
      message: "좋아요 취소 success",
    });
  });

module.exports = router;
