var meli = require("mercadolibre");
var meliObject = new meli.Meli(
  process.env.MercadoLivreID,
  process.env.MercadoLivreKey,
  process.env.MercadoLivreToken
);

function meliGet() {
  return new Promise((accept, reject) => {
    meliObject.get("questions", { seller_id: [106256693] }, function (
      err,
      res
    ) {
      if (err) {
        return reject(err);
      }
      return accept(res);
    });
  });
}

module.exports = {
  async index(req, res) {
    let result = await meliGet();
    return res.json(result);
  },
  async store(req, res) {
    console.log(req, res);
    return res.json(res, res);
  },
};
