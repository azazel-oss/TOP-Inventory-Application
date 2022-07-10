function indexGet(req, res) {
  res.render("index", { title: "Inventory" });
}

module.exports = { indexGet };
