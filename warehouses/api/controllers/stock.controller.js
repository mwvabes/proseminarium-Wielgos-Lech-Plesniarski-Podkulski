const models = require("../models")
const Stock = models.stock
const mongoose = require("mongoose")
const db = require("../config/dbconfig")

exports.getStock = (request, result) => {

  mongoose.connect(db.url, db.attr)

  //Stock.find({}).sort({ updatedAt: "desc" }).then(stock => {
  Stock.find({}).then(stock => {
    result.json({
      stock
    })
    mongoose.connection.close()
  })

}

exports.findStockByProductId = (request, result) => {

  mongoose.connect(db.url, db.attr)

  Stock.findOne({ productId: request.query.productId }).then(stock => {
    result.json({
      stock
    })
  })
}

exports.setStock = (request, result) => {

  if (request.query.productId == "null" || isNaN(request.query.availableQuantity)) {
    return result.status(400).json({
      error: "Wrong input data."
    })
  }

  mongoose.connect(db.url, db.attr)

  const note = new Stock({
    productId: request.query.productId,
    availableQuantity: request.query.availableQuantity
  })
  Stock.findOneAndUpdate({productId: request.query.productId}, {availableQuantity: request.query.availableQuantity}, {upsert: true} ).then(r => {
    result.json(
      r
    )
  })

}

exports.updateStock = (request, result) => {

  if (request.query.productId == "null" || isNaN(request.query.availableQuantity)) {
    return result.status(400).json({
      error: "Wrong input data."
    })
  }

  mongoose.connect(db.url, db.attr)

  Stock.findOne({ productId: request.query.productId }).then(stock => {

    if (stock == null) {
      return result.status(400).json({
        error: "Product not found."
      })
    }

    Stock.findOneAndUpdate({productId: request.query.productId}, {availableQuantity: (Number(request.query.availableQuantity) + Number(stock.availableQuantity))}, {upsert: true} ).then(r => {
      result.json(
        r
      )
    })

  })

}

exports.deleteAllStock = (request, result) => {

  mongoose.connect(db.url, { useNewUrlParser: true });

  Stock.deleteMany({}).then(stock => {
    result.json({
      stock
    })
    mongoose.connection.close()
  })

}