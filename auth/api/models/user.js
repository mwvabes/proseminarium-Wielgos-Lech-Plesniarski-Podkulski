const mongoose = require("mongoose");
const crypto = require("crypto");
const env = require("../env");

let UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    address: { type: String },
    verificationCode: { type: String },
    verifiedAt: { type: Date },
    scopes: { type: Array },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.validatePassword = function (password) {
  let _password = crypto
    .pbkdf2Sync(password, env.secret, 10000, 32, "sha512")
    .toString("hex");
  return this.password === _password;
};

UserSchema.methods.setPassword = function (password) {
  this.password = crypto
    .pbkdf2Sync(password, env.secret, 10000, 32, "sha512")
    .toString("hex");
};

mongoose.model("User", UserSchema, "users");
