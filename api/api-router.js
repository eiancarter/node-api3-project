const express = require("express");

const postsRouter = require("../posts/postRouter");

const router = express.Router();

router.use("/", postsRouter);

module.exports = router;
