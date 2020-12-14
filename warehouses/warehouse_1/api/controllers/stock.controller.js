const db = require("../models")
const Stock = db.stock

exports.getStock = (request, result) => {
  // Stock.find({}).then(res => {
  //   result.send(res)
  // })
  result.json({
    "da": "12"
  })
}