'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promocja extends Model {
    static associate(models) {
      Promocja.hasMany(models.Powiazanie_promocji, {
        foreignKey: 'id_promocji',
        as: 'promocja_powiazania',
      });
    }
  };
  Promocja.init({
    nazwa_promocji: DataTypes.STRING,
    wartosc_promocji: DataTypes.INTEGER,
    min_ilosc_produktu_w_koszyku: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Promocja',
  });
  return Promocja;
};