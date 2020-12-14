const express = require("express")
const router = express.Router()
const db = require("../models");
const stockController = require("../controllers/stock.controller.js");


router.get('/', stockController.getStock)

module.exports = router