
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {};

db.mongoose = mongoose;

db.stock = require("./Stock.model")
db.parcel = require("./Parcel.model")

module.exports = db