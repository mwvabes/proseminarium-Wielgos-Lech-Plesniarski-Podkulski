module.exports = (sequelize, Sequelize) => {
  const PozycjeZamowienia = sequelize.define(
    "pozycje_zamowienia",
    {
      id_produktu: {
        type: Sequelize.BIGINT,
        allowNull: false,
        min: 0,
      },
      nazwa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cena: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
        min: 0,
      },
      ilosc: {
        type: Sequelize.BIGINT,
        allowNull: false,
        min: 1,
        validate: {
          notNull: {
            msg: "Ilość jest wymagana!",
          },
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return PozycjeZamowienia;
};
