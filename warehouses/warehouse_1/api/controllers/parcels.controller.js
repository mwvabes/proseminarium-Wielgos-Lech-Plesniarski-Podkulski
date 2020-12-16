const models = require("../models")
const Parcel = models.parcel
const Stock = models.stock
const axios = require("axios")
const mongoose = require("mongoose")
const db = require("../config/dbconfig")
const { response } = require("express")

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

  Parcel.findById({ _id: request.query.parcelId}).then(parcel => {
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
    products.forEach(product => {
      Stock.findOne({ productId: product.productId}).then(foundProduct => {
        if (foundProduct == null) {
          axios
          .post(`http://localhost:8005/api/stock/setStock?productId=${product.productId}&availableQuantity=${product.quantity}`)
        }
        else {
          axios
          .post(`http://localhost:8005/api/stock/updateStock?productId=${product.productId}&availableQuantity=${product.quantity}`)
        }
      })
    })
    return {success: "Success!"}
  })
  .then(res => {
    result.json({
      res
    })
  })
  
  //console.log(await findOneParcel(request.query.parcelId))

  // Parcel.findOneAndUpdate({ _id: request.query.parcelId }, { status: "arrived" }, { upsert: true }).then((r) => {

  //   r.products.forEach(product => {
  //     Stock.findOne({ productId: product.productId }).then(stock => {
  //       console.log("STOCK", stock)
  //       mongoose.connect(db.url, db.attr)
  //       if (stock == null) {
  //         const stockN = new Stock({
  //           productId: product.productId,
  //           availableQuantity: product.quantity
  //         })
  //         stockN.save().catch(e => console.log("ERROR", e))
  //       }
  //       // if (stock != null) {
  //       //   stock.availableQuantity += product.quantity
  //       //   stock.save().catch(e => console.log("ERROR", e))
  //       // } else {
  //       //   const stock = new Stock({
  //       //     productId: product.productId,
  //       //     availableQuantity: product.quantity
  //       //   })
  //       //   stock.save().catch(e => console.log("ERROR", e))
  //       // }
  //     })
  //   })

    //return Promise.all(r.products)

    
  

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