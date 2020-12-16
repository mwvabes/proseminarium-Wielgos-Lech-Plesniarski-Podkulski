const mongoose = require("mongoose")

const stock = mongoose.model(
  "stock",
  new mongoose.Schema({
    productId: String,
    availableQuantity: Number
  },
  { timestamps: true })
)

module.exports = stock
