const express = require("express");
const router = express.Router();

const { indexGet, itemGet } = require("../controllers/itemController");

router.get("/", indexGet);

router.get("/:itemId", itemGet);

module.exports = router;
