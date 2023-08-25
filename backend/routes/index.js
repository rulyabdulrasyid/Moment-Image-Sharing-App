const express = require("express");
const router = express.Router();

const imageRouter = require("./imageRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/images", imageRouter);

module.exports = router;
