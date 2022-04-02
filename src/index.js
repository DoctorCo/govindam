require("dotenv").config();
const Levels = require("discord-xp");
Levels.setURL(process.env.mongodb);
const bot = new (require("../constructors/Govindam"))();
bot.start(process.env.token);
