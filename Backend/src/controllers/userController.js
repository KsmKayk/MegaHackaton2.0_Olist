const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    let users = await User.find();
    return res.json(users);
  },
  async store(req, res) {
    const { name, email, accountName, accountType, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      let passwordHash = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        accountName,
        accountType,
        passwordHash,
      });
    }
    return res.json(user);
  },
};
