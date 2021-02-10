const models = require("../models")
const Parcel = models.parcel
const Stock = models.stock
const axios = require("axios")
const mongoose = require("mongoose")
const db = require("../config/dbconfig")

exports.getParcels = (request, result) => {

  mongoose.connect(db.url, db.attr)

  Parcel.find({}).sort({ updatedAt: "desc" }).then(parcel => {
    result.json({
      parcel
    })
    mongoose.connection.close()
  })

}

exports.addParcel = (request, result) => {

  mongoose.connect(db.url, db.attr)

  const parcel = new Parcel({
    sender: request.body.sender,
    status: "in_shipping",
    products: request.body.products,
  })

  parcel.save().then(r => {
    console.log('Parcel saved!', request.body)
    result.json(
      r
    )
    mongoose.connection.close()
  })

}

exports.confirmArrival = (request, result) => {

  mongoose.connect(db.url, db.attr)

  Parcel.findById({ _id: request.query.parcelId }).then(parcel => {
    if (parcel == null) {
      return result.status(400).json({
        error: "Parcel not found."
      })
    } else if (parcel.status != "in_shipping") {
      return result.status(400).json({
        error: "Parcel status error or parcel has been already delivered."
      })
    }
    parcel.status = "delivered"
    parcel.save()

    mongoose.connect(db.url, db.attr)
    return parcel.products
  }).then(products => {
    console.log("PRODUCTS", products)
    let promises = []

    Stock.find({ productId: { $in: products.map(product => product.productId) } }).then(stocks => {

      promises = products.map(product => {

        const s = stocks.filter(p => { return product.productId == p.productId })

        let keyword = s.length == 0 ? "set" : "update"

        return axios.post(`http://localhost:90/${request.body.whKey}/api/stock/${keyword}Stock?productId=${product.productId}&availableQuantity=${product.quantity}`).catch(e => { })
      })
      Promise.all(promises).then(res => {
        //console.log("Execute this at the very end after axios are done")
        result.json({
          success: "Success!"
        })
      })
    })

  })

}

exports.deleteAllParcels = (request, result) => {

  mongoose.connect(db.url, db.attr)

  Parcel.deleteMany({}).then(parcel => {
    result.json({
      parcel
    })
    mongoose.connection.close()
  })

}