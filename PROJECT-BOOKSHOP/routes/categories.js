const express = require("express");
const router = express.Router();
const { getCategoryList } = require("../controller/CategoryController");

router.get("/", getCategoryList);

module.exports = router;
