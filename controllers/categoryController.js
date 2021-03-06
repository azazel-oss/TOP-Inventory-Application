const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
async function indexGet(req, res) {
  let categoriesList = await Category.find();
  res.render("category/categoriesView", {
    title: "Categories",
    categoriesList,
  });
}

async function categoryGet(req, res) {
  let currentCategory = await Category.findById(req.params.categoryId);
  let itemsInCategory = await Item.find({ category: req.params.categoryId });
  console.log(currentCategory);

  res.render("category/categoryDetail", {
    title: currentCategory.name,
    currentCategory,
    itemsInCategory,
  });
}

function createCategoryGet(req, res) {
  res.render("category/categoryForm", { title: "Create New Category" });
}

const createCategoryPost = [
  body("name", "Name should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("description", "Description should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      return res.render("category/categoryForm", {
        title: "Create New Category",
        category,
      });
    } else {
      try {
        await category.save();
      } catch (err) {
        next(err);
      }
      res.redirect("/inventory/category");
    }
  },
];

async function updateCategoryGet(req, res) {
  const currentCategory = await Category.findById(req.params.categoryId);
  res.render("category/categoryForm", {
    title: "Update Category",
    currentCategory,
  });
}

const updateCategoryPost = [
  body("name", "Name should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("description", "Description should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  async (req, res, next) => {
    const errors = validationResult(req);
    const updatedCategory = new Category({
      _id: req.params.categoryId,
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render("category/categoryForm", {
        title: "Update Category",
        currentCategory: updatedCategory,
      });
    } else {
      try {
        await Category.findByIdAndUpdate(
          req.params.categoryId,
          updatedCategory
        );
        res.redirect(updatedCategory.url);
      } catch (err) {
        next(err);
      }
    }
  },
];

async function deleteCategoryGet(req, res) {
  const currentCategory = await Category.findById(req.params.categoryId);
  const categoryItems = await Item.find({ category: req.params.categoryId });
  if (!currentCategory) {
    res.redirect("/inventory/category");
  } else {
    res.render("category/categoryDelete", {
      title: "Delete Category",
      currentCategory,
      categoryItems,
    });
  }
}

async function deleteCategoryPost(req, res, next) {
  const currentCategory = await Category.findById(req.params.categoryId);
  const categoryItems = await Item.find({ category: req.params.categoryId });
  if (!currentCategory) {
    return res.redirect("/inventory/category");
  }
  if (categoryItems.length) {
    return next(err);
  }
  try {
    await Category.findByIdAndRemove(req.params.categoryId);
    res.redirect("/inventory/category");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  indexGet,
  categoryGet,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryGet,
  deleteCategoryPost,
  createCategoryGet,
  createCategoryPost,
};
