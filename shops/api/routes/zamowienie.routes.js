module.exports = (app) => {
  const zamowienia = require("../controllers/zamowienie.controller.js");
  const ClientOAuth2 = require("client-oauth2");
  var session = require("express-session");
  var http = require("http");

  let client = new ClientOAuth2({
    clientId: "saklfsdomcsdkcmsdlkcmdslkd",
    clientSecret: "dsofsdlkfmdslkfmsdlkfmdlkvsdm",
    accessTokenUri: "http://localhost:8005/oauth/access_token",
    authorizationUri: "http://localhost:8005/oauth/authenticate",
    redirectUri: "http://localhost:8080/zamowienie/callback",
    scopes: ["user"],
    state: "test",
  });

  var router = require("express").Router();

  router.get("/login", function (req, res) {
    var uri = client.code.getUri();
    res.redirect(uri);
  });

  router.get("/callback", (req, res) => {
    console.log(req.originalUrl);
    client.code.getToken(req.originalUrl).then(function (user) {
      var token = client.createToken(
        user.data.access_token,
        user.data.refresh_token,
        user.data.token_type
      );
      token.expiresIn(user.data.expires_in);

      session.accessToken = `${user.data.token_type} ${user.data.access_token}`;
      return res.redirect("http://localhost:8081/zamowienie/callback");
    });
  });

  router.get("/userData", async (req, res) => {
    console.log(session);
    if (session.accessToken) {
      const options = {
        host: "localhost",
        port: 8005,
        path: "/account",
        method: "GET",
        json: true,
        headers: {
          Authorization: session.accessToken,
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
          return res.send({
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

  router.post("/", zamowienia.create);

  router.get("/", zamowienia.findAll);

  router.put("/", zamowienia.update);

  router.get("/:id", zamowienia.findOne);

  app.use("/zamowienie", router);
};
