const db = require("../models");
const Status = db.statusy;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  Status.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Wystąpił problem podczas tworzenia statusu!`,
      });
    });
};

exports.findAllByOrderId = (req, res) => {
  const orderId = req.params.orderId;

  const conditionOrderId = { zamowienieId: { [Op.eq]: orderId } };

  const sort = req.query.sort;
  const order = req.query.order;

  let conditionSort = ["id", "desc"];
  if (
    sort &&
    order &&
    ["id", "data_godzina", "typ"].includes(sort.toLowerCase()) &&
    ["asc", "desc"].includes(order.toLowerCase())
  ) {
    conditionSort = [sort, order];
  }

  Status.findAll({
    where: { [Op.and]: [conditionOrderId] },
    order: [conditionSort],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Wystąpił problem podczas pobierania listy statusów zamówienia o ID = ${orderId}!`,
      });
    });
};
