module.exports = (app) => {
  const router = require("express").Router()
  const parcelsController = require("../controllers/parcels.controller.js")

  router.get('/', parcelsController.getParcels)
  router.get('/my', parcelsController.getMyParcels)
  router.get('/getByOrder', parcelsController.getParcelsByOrder)
  router.post('/addParcel', parcelsController.addParcel)
  router.post('/commandParcel', parcelsController.addCommand)
  router.post('/confirmArrival', parcelsController.confirmArrival)
  router.get('/deleteAllParcels', parcelsController.deleteAllParcels)

  app.use('/parcels', router)

}