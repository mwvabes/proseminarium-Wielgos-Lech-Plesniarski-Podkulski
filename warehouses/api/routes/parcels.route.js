module.exports = (app) => {
  const router = require("express").Router()
  const parcelsController = require("../controllers/parcels.controller.js")

  router.get('/', parcelsController.getParcels)
  router.post('/addParcel', parcelsController.addParcel)
  router.post('/confirmArrival', parcelsController.confirmArrival)
  router.get('/deleteAllParcels', parcelsController.deleteAllParcels)

  app.use('/api/parcels', router)

}