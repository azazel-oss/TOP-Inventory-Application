const express = require("express");
const router = express.Router();

const {
  indexGet,
  categoryGet,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryGet,
  deleteCategoryPost,
  createCategoryGet,
  createCategoryPost,
} = require("../controllers/categoryController");

router.get("/", indexGet);

router.get("/create", createCategoryGet);

router.post("/create", createCategoryPost);

router.get("/:categoryId", categoryGet);

router.get("/:categoryId/update", updateCategoryGet);

router.post("/:categoryId/update", updateCategoryPost);

router.get("/:categoryId/delete", deleteCategoryGet);

router.post("/:categoryId/delete", deleteCategoryPost);

module.exports = router;
