const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/imageController");
const auth = require("../middlewares/authorization");

router.get("/", ImageController.getAll);
router.get("/:id", ImageController.getOne);
router.post("/create", auth, ImageController.create);
router.put("/:id", auth, ImageController.update);
router.delete("/:id", auth, ImageController.delete);

module.exports = router;
