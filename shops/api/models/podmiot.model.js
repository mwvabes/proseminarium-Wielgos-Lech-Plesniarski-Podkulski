module.exports = (sequelize, Sequelize) => {
  const Podmiot = sequelize.define(
    "podmiot_wystawiajacy",
    {
      nazwa: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nazwa podmiotu jest wymagana!",
          },
        },
      },
      adres: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Adres jest wymagany!",
          },
        },
      },
      nip: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "NIP jest wymagany!",
          },
          len: {
            args: [10, 10],
            msg: "Nieprawidłowa ilość cyfr w numerze NIP!",
          },
          isNumeric: { args: true, msg: "NIP musi zawierać same cyfry" },
          checksum(value) {
            const number = value.toString(10).split("").map(Number);
            const checksum =
              (6 * number[0] +
                5 * number[1] +
                7 * number[2] +
                2 * number[3] +
                3 * number[4] +
                4 * number[5] +
                5 * number[6] +
                6 * number[7] +
                7 * number[8]) %
              11;
            if (number[9] !== checksum) {
              throw new Error("Niezgodna suma kontrolna numeru NIP!");
            }
          },
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Podmiot;
};
