const mongoose = require("mongoose");

const stock = mongoose.model(
  "stock",
  new mongoose.Schema({
    productId: String,
    availableQuantity: String
  })
)

module.exports = stock
