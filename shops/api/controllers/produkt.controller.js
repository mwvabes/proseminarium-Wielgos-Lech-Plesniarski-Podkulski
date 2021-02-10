const fs = require("fs");

const fsPromises = fs.promises;

exports.findAll = async (req, res) => {
  const nip = req.query.nip;
  let multiplier = 1;
  if (nip) {
    multiplier +=
      (nip
        .split("")
        .map((x) => +x)
        .reduce((a, b) => a + b, 0) /
        nip.length) *
      0.05;
  }
  const produkty = await loadProducts();
  let content = JSON.parse(produkty).content;
  content = content.map((product) => {
    return {
      ...product,
      cena_netto: +(product.cena_netto * multiplier).toFixed(2),
    };
  });
  res.send(content);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  const produkty = await loadProducts();
  const content = JSON.parse(produkty).content;

  const data = content.find((product) => product.id === +id);

  res.send(data);
};

async function loadProducts() {
  try {
    return fsPromises.readFile("./mocks/produkt.json");
  } catch (err) {
    console.error(
      "Wystąpił problem przy odczycie pliku mocks/produkt.json!",
      err
    );
  }
}
