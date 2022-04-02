const { Schema, model } = require("mongoose");

let db = new Schema({
  enabled: Boolean,
  guildID: String,
  channelID: String,
  message: {
    type: String,
    default: "Welcome {member}! hope you enjoy your stay!",
  },
  image: { type: String, default: "https://i.imgur.com/zaN5mmf.png" },
});

module.exports = model("welcomedb", db);
