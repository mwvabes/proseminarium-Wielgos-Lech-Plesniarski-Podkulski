const mongoose = require("mongoose")

const parcel = mongoose.model(
  "parcel",
  new mongoose.Schema({
    sender: String,
    status: String,
    products: Array
  },
  { timestamps: true })
)

module.exports = parcel
