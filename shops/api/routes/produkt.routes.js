module.exports = (app) => {
  const produkty = require("../controllers/produkt.controller.js");

  var router = require("express").Router();

  router.get("/", produkty.findAll);

  router.get("/:id", produkty.findOne);

  app.use("/produkt", router);
};
