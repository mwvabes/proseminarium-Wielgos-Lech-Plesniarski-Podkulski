const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var session = require("express-session");
var cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({
  force: false,
});

require("./routes/zamowienie.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
