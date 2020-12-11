const express = require("express")
const bodyParser = require("body-parser")
const { join } = require("path")
const axios = require("axios")

const app = express()

app.set("view engine", "pug")
app.set("views", join(__dirname, "views"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => res.render("index"))

app.post("/newsletter", async (req, res) => {
  const response = await axios.post("", {
    email: req.body.email
  })

  res.json(response.data)
})

app.listen(process.env.PORT || 8005, err => {
  if (err) throw err;
  console.log("Server is upp!")
})