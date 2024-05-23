const express = require("express");
const router = express.Router();
const { getBookList, getBook } = require("../controller/BookController");

router.use(express.json());

router.get("/", getBookList);

router.get("/:bookId", getBook);

module.exports = router;
