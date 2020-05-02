var Airtable = require("airtable");
var base = new Airtable({ apiKey: "key5mUwt9UTuxleoy" }).base(
  "appw5mc6a3bucYJn6"
);

function airtableGet() {
  return new Promise((accept, reject) => {
    base("Questions")
      .select({
        view: "Grid view",
      })
      .firstPage(function (err, records) {
        if (err) {
          return reject(err);
        }
        let air = [];
        records.forEach(function (record) {
          air.push(record.fields);
        });
        return accept(air);
      });
  });
}

module.exports = {
  async index(req, res) {
    let result = await airtableGet();
    return res.json(result);
  },
};
