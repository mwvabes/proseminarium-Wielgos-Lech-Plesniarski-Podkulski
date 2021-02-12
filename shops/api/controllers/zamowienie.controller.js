const db = require("../models");
const Op = db.Sequelize.Op;

const Zamowienie = db.zamowienia;
const PozycjeZamowienia = db.pozycje_zamowienia;

exports.create = async (req, res) => {
  const zamowienie = {
    userId: req.body.userId,
    pozycje_zamowienia: req.body.pozycje_zamowienia,
    status: "Oczekujące",
  };

  Zamowienie.create(
    {
      ...zamowienie,
    },
    {
      include: [
        {
          model: PozycjeZamowienia,
          as: "pozycje_zamowienia",
        },
      ],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Wystąpił problem podczas tworzenia zamowienia!`,
      });
    });
};

exports.findAll = (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const userId = req.query.userId;

  const conditionUserId = userId ? { userId: { [Op.like]: `${nip}` } } : null;

  let conditionSort = ["id", "desc"];

  Zamowienie.findAndCountAll({
    offset: page ? +page * size : 0,
    limit: size ? +size : 10,
    include: [
      {
        model: PozycjeZamowienia,
        as: "pozycje_zamowienia",
      },
    ],
    where: { [Op.and]: [conditionUserId] },
    order: [conditionSort],
    distinct: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Wystąpił problem podczas pobierania listy podmiotów!`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Zamowienie.findByPk(id, {
    include: [
      {
        model: PozycjeZamowienia,
        as: "pozycje_zamowienia",
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Wystąpił problem podczas pobierania zamówienia o ID = ${id}!`,
      });
    });
};

exports.update = (req, res) => {
  Zamowienie.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Status został zaktualizowany pomyślnie.`,
        });
      } else {
        res.send({
          message: `Zamowienie o podanym id nie został znaleziony lub wysłane dane są nieprawidłowe!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Wystąpił problem podczas aktualizowania zamowienia z ID = ${id}!`,
      });
    });
};
