'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Powiazanie_promocji extends Model {
    static associate(models) {
      Powiazanie_promocji.belongsTo(models.Produkty, {
        foreignKey: 'id_produktu',
        as: 'powiazania_produkt'
      });
      Powiazanie_promocji.belongsTo(models.Promocja, {
        foreignKey: 'id_promocji',
        as: 'powiazania_promocja'
      });
    }
  };
  Powiazanie_promocji.init({
    id_produktu: DataTypes.INTEGER,
    id_promocji: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Powiazanie_promocji',
  });
  return Powiazanie_promocji;
};