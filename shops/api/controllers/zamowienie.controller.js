const db = require("../models");
const Op = db.Sequelize.Op;

const Podmioty = db.podmioty;
const Konrahenci = db.kontrahenci;
const Zamowienie = db.zamowienia;
const PozycjeZamowienia = db.pozycje_zamowienia;
const Statusy = db.statusy;

exports.create = async (req, res) => {
  const zamowienie = {
    podmiotId: req.body.podmiotId,
    kontrahentId: req.body.kontrahentId,
    priorytet: req.body.priorytet,
    pozycje_zamowienia: req.body.pozycje_zamowienia,
    statusy: [{ typ: "PLACED" }],
  };

  Zamowienie.create(
    {
      ...zamowienie,
    },
    {
      include: [
        { model: Podmioty, as: "podmiot" },
        { model: Statusy, as: "statusy" },
        { model: Konrahenci, as: "kontrahent" },
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
  const priorytet = req.query.priorytet;
  const nip = req.query.nip;

  const conditionPriorytet = priorytet
    ? { priorytet: { [Op.like]: `%${priorytet}%` } }
    : null;

  const conditionKontrahentNip = nip
    ? { nip: { [Op.like]: `%${nip}%` } }
    : null;

  const sort = req.query.sort;
  const order = req.query.order;

  let conditionSort = ["id", "desc"];
  if (
    sort &&
    order &&
    ["id", "priorytet"].includes(sort.toLowerCase()) &&
    ["asc", "desc"].includes(order.toLowerCase())
  ) {
    conditionSort = [sort, order];
  }

  Zamowienie.findAndCountAll({
    offset: page ? +page * size : 0,
    limit: size ? +size : 10,
    include: [
      { model: Podmioty, as: "podmiot" },
      { model: Statusy, as: "statusy" },
      {
        model: Konrahenci,
        as: "kontrahent",
        where: { [Op.and]: [conditionKontrahentNip] },
      },
      {
        model: PozycjeZamowienia,
        as: "pozycje_zamowienia",
      },
    ],
    where: { [Op.and]: [conditionPriorytet] },
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
      { model: Podmioty, as: "podmiot" },
      { model: Statusy, as: "statusy" },
      { model: Konrahenci, as: "kontrahent" },
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

exports.findAllByNip = (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const nip = req.query.nip;

  if (!nip) {
    res.status(500).send({
      message: `Parametr nip jest wymagany!`,
    });
  }

  const conditionKontrahentNip = nip
    ? { nip: { [Op.like]: `%${nip}%` } }
    : null;

  Zamowienie.findAndCountAll({
    offset: page ? +page * size : 0,
    limit: size ? +size : 10,
    include: [
      { model: Podmioty, as: "podmiot", attributes: ["nazwa", "nip", "adres"] },
      {
        model: Statusy,
        as: "statusy",
        attributes: ["typ", "data_godzina", "opis"],
      },
      {
        model: Konrahenci,
        as: "kontrahent",
        where: { [Op.and]: [conditionKontrahentNip] },
        attributes: ["nazwa", "nip", "adres"],
      },
      {
        model: PozycjeZamowienia,
        as: "pozycje_zamowienia",
        attributes: [
          "ilosc",
          "nazwa",
          "cena_netto",
          "procentowa_stawka_vat",
          "id_produktu",
        ],
      },
    ],
    attributes: ["id", "priorytet"],
    order: [["id", "desc"]],
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
