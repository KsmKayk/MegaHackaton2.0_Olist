require("dotenv").config();

let WSid = process.env.WTwilioSid;
let WToken = process.env.WTwilioToken;

let AirApi = process.env.AirtableKey;

const client = require("twilio")(WSid, WToken);

var Airtable = require("airtable");
var base = new Airtable({ apiKey: AirApi }).base("appw5mc6a3bucYJn6");
function verifyQuestions() {
  return new Promise((accept, reject) => {
    base("Questions")
      .select({
        view: "Grid view",
      })
      .firstPage(function (err, records) {
        if (err) {
          return reject(err);
        }

        let questions = records
          .map((item) => {
            return {
              id: item.id,
              question: item.fields.body,
              answer: item.fields.answer || null,
            };
          })
          .filter((item) => {
            return item.answer === null || item.answer.trim() === "";
          })
          .map((item) => {
            return {
              id: item.id,
              question: item.question,
            };
          });
        return accept(questions);
      });
  });
}

module.exports = {
  async index(req, res) {
    let result = await verifyQuestions();
    return res.json(result);
  },

  async store(req, res) {
    const { id, answer } = req.body;

    return console.log(req.body);
  },
};
