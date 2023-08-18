const express = require("express");
const router = express.Router();

const imageRouter = require("./imageRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

router.use("/category", categoryRouter);
router.use("/users", userRouter);
router.use("/", imageRouter);

module.exports = router;
