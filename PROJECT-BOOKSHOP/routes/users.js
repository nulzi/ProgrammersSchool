const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  requestPasswordReset,
  resetPassword,
} = require("../controller/UserController");

router.use(express.json());

// 회원가입
router.post("/signup", signup);

// 로그인
router.post("/login", login);

// 비밀번호 초기화 요청
router.post("/reset", requestPasswordReset);

// 비밀번호 초기화
router.put("/reset", resetPassword);

module.exports = router;
