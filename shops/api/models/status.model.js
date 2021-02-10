module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define(
    "statusy",
    {
      data_godzina: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          notNull: {
            msg: "Data i godzina jest wymagana!",
          },
        },
      },
      typ: {
        type: Sequelize.ENUM(
          "PLACED",
          "WAITING_PRODUCTS",
          "IN_REALIZATION",
          "SHIPPED",
          "DONE",
          "OTHER_EVENT",
          "CANCELED"
        ),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Typ jest wymagany!",
          },
          isCorrect(value, next) {
            Status.findOne({
              where: {
                zamowienieId: { [Sequelize.Op.eq]: this.zamowienieId },
              },
              order: [["id", "desc"]],
            })
              .then((call) => {
                if (!call) {
                  return next();
                }
                switch (call.typ) {
                  case "PLACED": {
                    if (
                      [
                        "WAITING_PRODUCTS",
                        "IN_REALIZATION",
                        "SHIPPED",
                        "OTHER_EVENT",
                        "CANCELED",
                      ].includes(value)
                    ) {
                      return next();
                    }
                    break;
                  }
                  case "WAITING_PRODUCTS": {
                    if (
                      ["IN_REALIZATION", "OTHER_EVENT", "CANCELED"].includes(
                        value
                      )
                    ) {
                      return next();
                    }
                    break;
                  }
                  case "IN_REALIZATION": {
                    if (
                      ["SHIPPED", "OTHER_EVENT", "CANCELED"].includes(value)
                    ) {
                      return next();
                    }
                    break;
                  }
                  case "SHIPPED": {
                    if (["DONE", "OTHER_EVENT", "CANCELED"].includes(value)) {
                      return next();
                    }
                    break;
                  }
                  case "OTHER_EVENT": {
                    if (
                      [
                        "WAITING_PRODUCTS",
                        "IN_REALIZATION",
                        "SHIPPED",
                        "DONE",
                        "CANCELED",
                      ].includes(value)
                    ) {
                      return next();
                    }
                    break;
                  }
                  case "CANCELED": {
                    return next(
                      "Nie można zmienić statusu anulowanego zamówienia!"
                    );
                  }
                  case "DONE": {
                    return next(
                      "Nie można zmienić statusu zrealizowanego zamówienia!"
                    );
                  }
                }
                return next("Podano błędny status zamówienia");
              })
              .catch((err) => {
                next(err.message);
              });
          },
        },
      },
      opis: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Status;
};
