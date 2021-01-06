const router = require("express").Router();
const OAuthServer = require("express-oauth-server");
const OAuthModel = require("../models/oauth");
const env = require("../env");

let oauth = new OAuthServer({
  model: OAuthModel,
  debug: true,
});

router.post(
  "/oauth/access_token",
  oauth.token({
    requireClientAuthentication: {
      authorization_code: true,
      refresh_token: false,
    },
  })
);

router.get("/oauth/authenticate", async (req, res, next) => {
  return res.render("authenticate");
});

router.post(
  "/oauth/authenticate",
  async (req, res, next) => {
    req.body.user = await OAuthModel.getUser(req.body.email, req.body.password);
    if (!(req.query && Object.keys(req.query).length)) {
      req.query = {
        response_type: "code",
        state: "test",
        client_id: env.id,
        scope: "user",
        redirect_uri: "http://localhost:8005/dashboard",
      };
    }

    return next();
  },
  oauth.authorize({
    authenticateHandler: {
      handle: (req) => {
        return req.body.user;
      },
    },
  })
);

module.exports = router;
