const router = require("express").Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const env = require("../env");

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Mikroserwis autoryzacji",
  });
});

router.get("/register", (req, res, next) => {
  res.render("register", { message: req.flash("message") });
});

router.post("/register", async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords does not match", 422);
  }

  let UserModel = mongoose.model("User");

  let _user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    verificationCode: crypto.randomBytes(16).toString("hex"),
    scopes: [{ clientId: env.id, scopes: ["user"] }],
  });
  _user.setPassword(req.body.password);
  let user = null;
  try {
    user = await _user.save();
  } catch (error) {
    return res.send(error.errmsg, 422);
  }

  if (!user) {
    return res.send("Error creating user", 422);
  }

  req.flash("message", "Registration successful!");

  return res.redirect("/register");
});

module.exports = router;
