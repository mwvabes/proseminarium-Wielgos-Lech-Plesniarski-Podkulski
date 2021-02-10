const express = require("express")
const bodyParser = require("body-parser")
const { join } = require("path")
const axios = require("axios")
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

require("./routes/stock.route")(app)
require("./routes/parcels.route")(app)

app.get('/', (request, result) => {
  result.json({
    "name": process.env.WHNAME,
    "whKey": process.env.WHKEY
  })
})



app.listen(process.env.PORT || 8005, err => {
  if (err) throw err;
  console.log("Server is up!")
})