const { config } = require("dotenv");
config();
const bot = new (require("../constructors/Govindam"))();
bot.start(process.env.token)