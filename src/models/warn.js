const { Schema, model } = require("mongoose");

let db = new Schema({
  guildID: String,
  userID: String,
  punishments: Array,
});

module.exports = model("shuddhdb", db);
