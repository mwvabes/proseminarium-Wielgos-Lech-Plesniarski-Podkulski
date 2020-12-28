module.exports = (app) => {
  const router = require("express").Router()
  const stockController = require("../controllers/stock.controller.js")

  router.get('/', stockController.getStock)

  router.post('/setStock', stockController.setStock)
  router.post('/updateStock', stockController.updateStock)

  router.get('/findOne', stockController.findStockByProductId)

  router.delete('/deleteAll', stockController.deleteAllStock)

  app.use('/api/stock', router)

}