const Category = require("../models/category");
const Item = require("../models/item");
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

module.exports = { indexGet, categoryGet };
