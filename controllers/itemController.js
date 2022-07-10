const Item = require("../models/item");
const Category = require("../models/category");

async function indexGet(req, res) {
  let itemsList = await Item.find();
  res.render("item/itemsView", { title: "Items", itemsList });
}

async function itemGet(req, res) {
  let currentItem = await Item.findById(req.params.itemId).populate("category");
  let itemCategory = await Category.findById(currentItem.category._id);
  res.render("item/itemDetail", {
    title: currentItem.name,
    currentItem,
    itemCategory,
  });
}

function updateItemGet(req, res) {
  // TODO: To be implemented
  res.send("WIP");
}

function updateItemPost(req, res) {
  // TODO: To be implemented
  res.send("WIP");
}

function deleteItemGet(req, res) {
  // TODO: To be implemented
  res.send("WIP");
}

function deleteItemPost(req, res) {
  // TODO: To be implemented
  res.send("WIP");
}

module.exports = {
  indexGet,
  itemGet,
  updateItemGet,
  updateItemPost,
  deleteItemGet,
  deleteItemPost,
};
