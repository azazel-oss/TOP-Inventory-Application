const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");

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

async function createItemGet(req, res) {
  let categoriesList = await Category.find();
  res.render("item/itemForm", { title: "Create new item", categoriesList });
}

const createItemPost = [
  body("name", "Name should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("description", "Description should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("price", "Price should not be negative").toFloat().blacklist("<>"),
  body("num_stock", "Number of items in stock should not be empty").toInt(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_stock: req.body.num_stock,
    });
    let categoriesList = await Category.find();
    if (!errors.isEmpty()) {
      res.render("item/itemForm", {
        title: "Create new item",
        categoriesList,
        currentItem: item,
      });
    } else {
      try {
        await item.save();
        res.redirect(item.url);
      } catch (err) {
        next(err);
      }
    }
  },
];

async function updateItemGet(req, res) {
  const currentItem = await Item.findById(req.params.itemId);
  const categoriesList = await Category.find();
  res.render("item/itemForm", {
    title: "Update Item",
    currentItem,
    categoriesList,
  });
}

const updateItemPost = [
  body("name", "Name should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("description", "Description should not be empty")
    .trim()
    .isLength({ min: 1 })
    .blacklist("<>"),
  body("price", "Price should not be negative").toFloat().blacklist("<>"),
  body("num_stock", "Number of items in stock should not be empty").toInt(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const updatedItem = new Item({
      _id: req.params.itemId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_stock: req.body.num_stock,
    });
    let categoriesList = await Category.find();
    if (!errors.isEmpty()) {
      res.render("item/itemForm", {
        title: "Update Item",
        currentItem: updatedItem,
        categoriesList,
      });
    } else {
      try {
        await Item.findByIdAndUpdate(req.params.itemId, updatedItem);
        res.redirect(updatedItem.url);
      } catch (err) {
        next(err);
      }
    }
  },
];

async function deleteItemGet(req, res) {
  let currentItem = await Item.findById(req.params.itemId);
  res.render("item/itemDelete", { title: "Delete Item", currentItem });
}

async function deleteItemPost(req, res, next) {
  let itemToDelete = await Item.findById(req.params.itemId);
  if (!itemToDelete) {
    return res.redirect("/inventory/category");
  } else {
    try {
      await Item.findByIdAndRemove(req.params.itemId);
      res.redirect("/inventory/category");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  indexGet,
  itemGet,
  updateItemGet,
  updateItemPost,
  deleteItemGet,
  deleteItemPost,
  createItemGet,
  createItemPost,
};
