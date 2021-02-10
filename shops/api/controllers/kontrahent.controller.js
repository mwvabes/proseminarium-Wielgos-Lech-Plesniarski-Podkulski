const db = require("../models");
const fs = require("fs");

const Kontrahent = db.kontrahenci;
const Op = db.Sequelize.Op;
const fsPromises = fs.promises;

exports.findAll = async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const nazwa = req.query.nazwa;
  const nip = req.query.nip;
  const adres = req.query.adres;

  const conditionNazwa = nazwa ? { nazwa: { [Op.like]: `%${nazwa}%` } } : null;
  const conditionNip = nip ? { nip: { [Op.like]: `%${nip}%` } } : null;
  const conditionAdres = adres ? { adres: { [Op.like]: `%${adres}%` } } : null;

  const sort = req.query.sort;
  const order = req.query.order;

  let conditionSort = ["id", "asc"];
  if (
    sort &&
    order &&
    ["id", "nip", "adres", "nazwa"].includes(sort.toLowerCase()) &&
    ["asc", "desc"].includes(order.toLowerCase())
  ) {
    conditionSort = [sort, order];
  }

  await upsert();

  Kontrahent.findAll({
    where: {
      [Op.and]: [conditionNazwa, conditionNip, conditionAdres],
    },
    order: [conditionSort],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Wystąpił problem podczas pobierania listy kontrahentów!`,
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  await upsert();

  Kontrahent.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Wystąpił problem podczas pobierania informacji o kontrahencie z ID = ${id}!`,
      });
    });
};

async function upsert() {
  const kontrahenci = await loadKontrahenci();
  const content = JSON.parse(kontrahenci).content;

  const upsert = await Kontrahent.bulkCreate(content, {
    updateOnDuplicate: ["nazwa", "adres", "nip"],
  });
}

async function loadKontrahenci() {
  try {
    return fsPromises.readFile("./mocks/kontrahent.json");
  } catch (err) {
    console.error(
      "Wystąpił problem przy odczycie pliku mocks/kontrahent.json!",
      err
    );
  }
}
