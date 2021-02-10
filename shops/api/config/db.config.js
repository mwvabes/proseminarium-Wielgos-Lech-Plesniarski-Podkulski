module.exports = {
  HOST: "db-service",
  USER: "root",
  PASSWORD: "password",
  DB: "shop",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
