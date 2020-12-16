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
    //mongoose.connection.close()
  })

}


exports.confirmArrival = (request, result) => {

  mongoose.connect(db.url, db.attr)

  Parcel.findOneAndUpdate({ _id: request.query.parcelId }, { status: "arrived" }, { upsert: true }).then((r) => {

    //console.log("x", r)
    //mongoose.connection.close()

    for (product of r.products) {
      
      Stock.findOne({ productId: product.productId}).then(stock => {
        console.log("STOCK", stock)
        //mongoose.connect(db.url, db.attr)
        if (stock != null) {
          stock.availableQuantity += product.quantity
          stock.save().catch(e => console.log("ERROR", e))
        } else {
          const stock = new Stock({
            productId: product.productId,
            availableQuantity: product.quantity
          })
          stock.save().catch(e => console.log("ERROR", e))
        }
      })
    }

    result.json({
      success: "Operation successful!"
    })

    // for (product of r.products) {
      // Stock.findOne({ productId: product.productId }).then(stock => {
      //   stock.availableQuantity += product[0].quantity
      //   //console.log("NEW:", stock)
      //   stock.save()
      //   result.json({
      //     r
      //   })
    
    //for await (product of r.products) {
      //console.log(product.productId)
      // Stock.findOne({ productId: product.productId }).then(stock => {
      //   stock.availableQuantity += product[0].quantity
      //   console.log("NEW:", stock)
      //   stock.save()
      //   result.json({
      //     r
      //   })
        
      // })
      //mongoose.connection.close()
    //}

      // for (product of r.products) {
      //   Stock.findOne({ productId: request.query.productId }).then(stock => {

      //     if (stock == null) {
      //       return result.status(400).json({
      //         error: "Product not found."
      //       })
      //     }
      
      //     Stock.findOneAndUpdate({productId: product.productId}, {availableQuantity: (Number(product.quantity) + Number(stock.availableQuantity))}, {upsert: true} ).then(r => {
      //       result.json(
      //         r
      //       )
      //     })
      
      //   })
      // }
    
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