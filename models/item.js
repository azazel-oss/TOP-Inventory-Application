const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  number_stock: { type: Number, required: true },
  price: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return "/inventory/item/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
