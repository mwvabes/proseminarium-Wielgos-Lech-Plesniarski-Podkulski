const express = require("express")
const bodyParser = require("body-parser")
const { join } = require("path")
const axios = require("axios")

const app = express()

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

app.use('/api/stock', require('./routes/stock.route'))

app.get('/', (request, result) => {
  // Stock.find({}).then(res => {
  //   result.send(res)
  // })
  result.json({
    "Success": "Working!"
  })
})

// app.get("/", (req, res) => res.render("index"))

// app.post("/newsletter", async (req, res) => {
//   const response = await axios.post("", {
//     email: req.body.email
//   })

//   res.json(response.data)
// })

//require("./routes/stock.route")(app)

app.listen(process.env.PORT || 8005, err => {
  if (err) throw err;
  console.log("Server is up!")
})