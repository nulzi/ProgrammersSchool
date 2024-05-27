const express = require("express");
const router = express.Router();
const { addLike, cancelLike } = require("../controller/LikeController");

router.use(express.json());

router.route("/:bookId").post(addLike).delete(cancelLike);

module.exports = router;
