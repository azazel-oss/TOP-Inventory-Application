const express = require("express");
const router = express.Router();

const { indexGet, categoryGet } = require("../controllers/categoryController");
router.get("/", indexGet);

router.get("/:categoryId", categoryGet);

module.exports = router;
