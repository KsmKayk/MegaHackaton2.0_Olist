const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  accountName: String,
  accountType: String,
  passwordHash: String,
});

module.exports = mongoose.model("User", userSchema);
