require("dotenv").config();
let AirApi = process.env.AirtableKey;

var Airtable = require("airtable");
var base = new Airtable({ apiKey: AirApi }).base("appw5mc6a3bucYJn6");

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
  async store(req, res) {
    const { reportedAt, status, body } = req.body;
    function addQuestion() {
      return new Promise((accept, reject) => {
        base("Questions").create(
          [
            {
              fields: {
                reportedAt: reportedAt,
                status: status,
                body: body,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            return accept(records);
          }
        );
      });
    }
    let add = await addQuestion();
    return res.json(add);
  },
};
