module.exports = (sequelize, Sequelize) => {
  const Kontrahent = sequelize.define(
    "kontrahenci",
    {
      nazwa: {
        type: Sequelize.STRING,
      },
      adres: {
        type: Sequelize.STRING,
      },
      nip: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Kontrahent;
};
