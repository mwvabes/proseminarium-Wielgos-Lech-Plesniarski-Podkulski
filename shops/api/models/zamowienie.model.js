module.exports = (sequelize, Sequelize) => {
  const Zamowienie = sequelize.define(
    "zamowienia",
    {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Zamowienie;
};
