var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var env = require("./env");
var http = require("http");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: env.secret,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: false,
    sourceMap: true,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(env.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error: "));
db.once("open", console.log.bind(console, "MongoDB connection successful"));

require("./models/user");
require("./models/oauth");

app.use(require("./routes"));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.render("error");
});

app.set("port", env.port);

var server = http.createServer(app);

server.listen(env.port);
