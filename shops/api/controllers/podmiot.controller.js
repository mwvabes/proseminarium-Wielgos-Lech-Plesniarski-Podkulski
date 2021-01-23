const db = require("../models");
const Podmiot = db.podmioty;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const podmiot = {
    nazwa: req.body.nazwa,
    adres: req.body.adres,
    nip: req.body.nip,
  };

  Podmiot.create(podmiot)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Wystąpił problem podczas tworzenia podmiotu!`,
      });
    });
};

exports.findAll = (req, res) => {
  const nazwa = req.query.nazwa;
  const adres = req.query.adres;
  const nip = req.query.nip;

  const conditionNazwa = nazwa ? { nazwa: { [Op.like]: `%${nazwa}%` } } : null;
  const conditionAdres = adres ? { adres: { [Op.like]: `%${adres}%` } } : null;
  const conditionNip = nip ? { nip: { [Op.like]: `%${nip}%` } } : null;

  const sort = req.query.sort;
  const order = req.query.order;

  let conditionSort = ["id", "desc"];
  if (
    sort &&
    order &&
    ["nazwa", "adres", "nip"].includes(sort.toLowerCase()) &&
    ["asc", "desc"].includes(order.toLowerCase())
  ) {
    conditionSort = [sort, order];
  }

  Podmiot.findAll({
    where: { [Op.and]: [conditionNazwa, conditionAdres, conditionNip] },
    order: [conditionSort],
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

  Podmiot.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Wystąpił problem podczas pobierania informacji o podmiocie z ID = ${id}!`,
      });
    });
};

exports.update = (req, res) => {
  Podmiot.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Podmiot został zaktualizowany pomyślnie.`,
        });
      } else {
        res.send({
          message: `Podmiot o podanym id nie został znaleziony lub wysłane dane są nieprawidłowe!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Wystąpił problem podczas aktualizowania podmiotu z ID = ${id}!`,
      });
    });
};
