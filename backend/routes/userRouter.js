const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getAll);
router.post("/signin", UserController.signin);
router.post("/signup", UserController.signup);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
