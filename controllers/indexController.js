const Item = require("../models/item");
const Category = require("../models/category");

async function indexGet(req, res) {
  let itemCount = await Item.find().count();
  let categoryCount = await Category.find().count();
  console.log(itemCount);
  res.render("index", { title: "Inventory", itemCount, categoryCount });
}

module.exports = { indexGet };
