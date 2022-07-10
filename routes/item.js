const express = require("express");
const router = express.Router();

const {
  indexGet,
  itemGet,
  updateItemGet,
  updateItemPost,
  deleteItemGet,
  deleteItemPost,
} = require("../controllers/itemController");

router.get("/", indexGet);

router.get("/:itemId", itemGet);

router.get("/:itemId/update", updateItemGet);

router.post("/:itemId/update", updateItemPost);

router.get("/:itemId/delete", deleteItemGet);

router.post("/:itemId/delete", deleteItemPost);

module.exports = router;
