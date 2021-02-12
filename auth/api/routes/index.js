const router = require("express").Router();
const OAuthServer = require("express-oauth-server");
const OAuthModel = require("../models/oauth");
const ClientOAuth2 = require("client-oauth2");
const http = require("http");
const mongoose = require("mongoose");

let oauth = new OAuthServer({
  model: OAuthModel,
  useErrorHandler: true,
  debug: true,
  accessTokenLifetime: 4 * 60 * 60,
});

let client = new ClientOAuth2({
  clientId: "kj34n5jk43nkj34nkj34ntkj34n",
  clientSecret: "a5828e9d6052dc3b14a93e07a5932dd9",
  accessTokenUri: "http://localhost:8005/oauth/access_token",
  authorizationUri: "http://localhost:8005/oauth/authenticate",
  redirectUri: "http://localhost:8005/callback",
  scopes: ["user"],
  state: "xd",
});

router.use(require("./oauth"));
router.use(require("./public"));

router.get("/login", function (req, res) {
  var uri = client.code.getUri();
  res.redirect(uri);
});

router.get("/callback", (req, res) => {
  client.code.getToken(req.originalUrl).then(function (user) {
    var token = client.createToken(
      user.data.access_token,
      user.data.refresh_token,
      user.data.token_type
    );
    token.expiresIn(user.data.expires_in);
    req.session.accessToken = `${user.data.token_type} ${user.data.access_token}`;
    return res.redirect("http://localhost:8005/dashboard");
  });
});

router.use("/dashboard", async (req, res) => {
  if (req.session.accessToken) {
    const options = {
      host: "localhost",
      port: 8005,
      path: "/account",
      method: "GET",
      json: true,
      headers: {
        Authorization: req.session.accessToken,
      },
    };

    const test = http.request(options, function (response) {
      let body = "";
      response.setEncoding("utf8");

      response.on("readable", function () {
        var chunk = this.read() || "";
        body += chunk;
      });

      response.on("end", function () {
        return res.render("secured", {
          user: JSON.parse(body),
          token: req.session.accessToken,
        });
      });

      response.on("error", function (e) {
        return res.status(500).send("Błąd serwera");
      });
    });
    test.end();
  } else {
    return res.status(401).send("Brak uprawnień");
  }
});

router.post("/changeData", oauth.authenticate(), async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Hasła nie są takie same", 422);
  }

  let userT = res.locals.oauth.token.user;
  let UserModel = mongoose.model("User");

  await UserModel.findOneAndUpdate(
    { _id: userT._id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      },
    },
    {},
    (err, doc) => {
      if (err) {
        return res.send(error.errmsg, 500);
      }
    }
  );

  await UserModel.findById(userT._id, async (err, usr) => {
    if (err) {
      return res.send(error.errmsg, 500);
    }

    usr.setPassword(req.body.password);
    try {
      user = await usr.save();
    } catch (error) {
      return res.send(error.errmsg, 422);
    }
  });

  return res.redirect("/login");
});

router.use("/account", oauth.authenticate(), (req, res) => {
  let user = res.locals.oauth.token.user;
  const client = res.locals.oauth.token.client;

  user.scopes = user.scopes.find(
    (scope) => scope.client_id === client.id
  ).scopes;

  delete user.verificationCode;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;

  return res.json(user);
});

module.exports = router;
