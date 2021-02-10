module.exports = (app) => {
  const zamowienia = require("../controllers/zamowienie.controller.js");

  var router = require("express").Router();

  router.post("/", zamowienia.create);

  router.get("/", zamowienia.findAll);

  router.get("/kontrahent", zamowienia.findAllByNip);

  router.get("/:id", zamowienia.findOne);

  app.use("/zamowienie", router);
};
