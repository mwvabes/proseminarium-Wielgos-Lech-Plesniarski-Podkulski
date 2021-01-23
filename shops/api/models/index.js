const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  autoreconnect: true,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.podmioty = require("./podmiot.model.js")(sequelize, Sequelize);
db.kontrahenci = require("./kontrahent.model.js")(sequelize, Sequelize);
db.zamowienia = require("./zamowienie.model.js")(sequelize, Sequelize);
db.pozycje_zamowienia = require("./pozycje_zamowienia.model.js")(
  sequelize,
  Sequelize
);
db.statusy = require("./status.model.js")(sequelize, Sequelize);

db.podmioty.hasMany(db.zamowienia, {
  as: "podmiot",
  foreignKey: { name: "podmiotId", allowNull: false },
});
db.zamowienia.belongsTo(db.podmioty, {
  as: "podmiot",
  foreignKey: { name: "podmiotId", allowNull: false },
});

db.kontrahenci.hasMany(db.zamowienia, {
  as: "kontrahent",
  foreignKey: { name: "kontrahentId", allowNull: false },
});
db.zamowienia.belongsTo(db.kontrahenci, {
  as: "kontrahent",
  foreignKey: { name: "kontrahentId", allowNull: false },
});

db.zamowienia.hasMany(db.pozycje_zamowienia, {
  as: "pozycje_zamowienia",
  foreignKey: { name: "zamowienieId", allowNull: false },
});
db.pozycje_zamowienia.belongsTo(db.zamowienia, {
  as: "pozycje_zamowienia",
  foreignKey: { name: "zamowienieId", allowNull: false },
});

db.zamowienia.hasMany(db.statusy, {
  as: "statusy",
  foreignKey: { name: "zamowienieId", allowNull: false },
});
db.statusy.belongsTo(db.zamowienia, {
  as: "statusy",
  foreignKey: { name: "zamowienieId", allowNull: false },
});

module.exports = db;
