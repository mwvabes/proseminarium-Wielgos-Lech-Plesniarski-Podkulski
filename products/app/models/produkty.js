'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produkty extends Model {
    static associate(models) {
      Produkty.hasMany(models.Powiazanie_promocji, {
        foreignKey: 'id_produktu',
        as: 'produkty_powiazania',
      });
    }
  };
  Produkty.init({
    nazwa: DataTypes.STRING,
    opis: DataTypes.STRING,
    cena: DataTypes.FLOAT,
    wymiary: DataTypes.STRING,
    ean: DataTypes.INTEGER,
    kategoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produkty',
  });
  return Produkty;
};