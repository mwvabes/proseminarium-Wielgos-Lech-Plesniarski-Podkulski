const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/register",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.register
  );

  app.post("/auth/login", controller.login);
};