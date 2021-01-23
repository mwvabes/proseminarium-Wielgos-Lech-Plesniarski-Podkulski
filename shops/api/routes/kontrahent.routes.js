module.exports = (app) => {
  const kontrahenci = require("../controllers/kontrahent.controller.js");

  var router = require("express").Router();

  router.get("/", kontrahenci.findAll);

  router.get("/:id", kontrahenci.findOne);

  app.use("/kontrahent", router);
};
