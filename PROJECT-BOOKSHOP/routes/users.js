const express = require("express");
const router = express.Router();

router.use(express.json());

// 회원가입
router.post("/signup", (req, res) => {
  res.status(200).json({
    message: "signup success",
  });
});

// 로그인
router.post("/login", (req, res) => {
  res.status(200).json({
    message: "login success",
  });
});

// 비밀번호 초기화 요청
router.post("/reset", (req, res) => {
  res.status(200).json({
    message: "reset success",
  });
});

// 비밀번호 초기화
router.put("/reset", (req, res) => {
  res.status(200).json({
    message: "reset2 success",
  });
});

module.exports = router;
