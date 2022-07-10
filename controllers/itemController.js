function indexGet(req, res) {
  res.send("Show all items");
}

function itemGet(req, res) {
  res.send(`Show item with ${req.params.itemId} id`);
}

module.exports = { indexGet, itemGet };
