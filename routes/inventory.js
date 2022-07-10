const express = require("express");
const router = express.Router();
const { indexGet } = require("../controllers/indexController");

router.get("/", indexGet);

module.exports = router;
