var Airtable = require("airtable");
var base = new Airtable({ apiKey: "key5mUwt9UTuxleoy" }).base(
  "appw5mc6a3bucYJn6"
);
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
        // let arr = [];
        // let without = [];
        // records.forEach(function (record) {
        //   arr.push([record.fields.body, record.fields.answer]);
        // });
        // arr.forEach(function (arra) {
        //   if (arra[1] == null && arra[1] == "") {
        //     without.push([arra[0], arra[1]]);
        //   }
        // });
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
    
  },
};
