module.exports = (app) => {
  const podmioty = require("../controllers/podmiot.controller.js");

  var router = require("express").Router();

  router.post("/", podmioty.create);

  router.get("/", podmioty.findAll);

  router.get("/:id", podmioty.findOne);

  router.put("/", podmioty.update);

  app.use("/podmiot", router);
};
