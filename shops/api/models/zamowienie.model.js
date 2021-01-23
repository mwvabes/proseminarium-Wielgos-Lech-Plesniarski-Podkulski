module.exports = (sequelize, Sequelize) => {
  const Zamowienie = sequelize.define(
    "zamowienia",
    {
      priorytet: {
        type: Sequelize.ENUM("ECONOMY", "STANDARD", "FAST"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Priorytet jest wymagany!",
          },
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Zamowienie;
};
