module.exports = {
  port: 8005,
  mongoUrl: "mongodb://db-service:27017/oauth",
  secret: "a5828e9d6052dc3b14a93e07a5932dd9",
  id: "kj34n5jk43nkj34nkj34ntkj34n",
  redirectUri: [`localhost:${this.port}`, `localhost:${this.port}/callback`],
};
