#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const Category = require("./models/category");
const Item = require("./models/item");

var mongoose = require("mongoose");
const { populate } = require("./models/category");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];
const items = [];

async function categoryCreate(name, description) {
  let categoryDetail = { name, description };
  const category = new Category(categoryDetail);
  await category.save();
  categories.push(category);
}

async function itemCreate(name, description, category, number_stock, price) {
  let itemDetail = {
    name,
    description,
    category,
    number_stock,
    price,
  };

  const item = new Item(itemDetail);
  await item.save();
  items.push(item);
}

async function createCategory() {
  await categoryCreate(
    "Motorcycles",
    "Two wheeled vehicle used to travel usually where there are parking issues"
  );
  await categoryCreate(
    "Cycles",
    "Small two wheeled vehicle which is very boring and is not recommended at all"
  );
}

async function createItem() {
  await itemCreate("Enfield", "Dup Dup", categories[0], 4, 599.99);
  await itemCreate(
    "Lady Bird",
    "A cycle lmfao that nobody likes to ride",
    categories[1],
    10,
    199.79
  );
}

async function populateDB() {
  await createCategory();
  await createItem();
  mongoose.connection.close();
}

populateDB();
