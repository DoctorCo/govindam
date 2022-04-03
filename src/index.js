const Levels = require("discord-xp");
require("dotenv").config();
Levels.setURL(process.env.mongodb);
const bot = new (require("../constructors/Govindam"))();
bot.start(process.env.token);
