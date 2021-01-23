const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({
  force: false,
});

require("./routes/podmiot.routes")(app);
require("./routes/produkt.routes")(app);
require("./routes/kontrahent.routes")(app);
require("./routes/zamowienie.routes")(app);
require("./routes/status.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
