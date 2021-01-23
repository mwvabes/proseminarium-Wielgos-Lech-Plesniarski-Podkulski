module.exports = (app) => {
  const statusy = require("../controllers/status.controller.js");

  var router = require("express").Router();

  router.post("/", statusy.create);

  router.get("/:orderId", statusy.findAllByOrderId);

  app.use("/status", router);
};
