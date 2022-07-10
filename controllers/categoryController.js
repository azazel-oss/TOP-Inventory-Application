function indexGet(req, res) {
  res.send("Show all categories");
}

function categoryGet(req, res) {
  res.send(`Show items in ${req.params.categoryId} category`);
}

module.exports = { indexGet, categoryGet };
