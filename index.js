const { Client } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const bot = new Client({
  intents: 32767,
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

bot.on("ready", () => {
  console.log(`${bot.user.tag} is online!`);
});


bot.on("messageCreate", (message) => {
  if (message.author.id === bot.user.id) return;
  let data = fs.readFileSync(path.resolve(__dirname, "db.json"));
  const shabda = JSON.parse(data);

  for (a in shabda) {
    if (message.content.toLowerCase().includes(a)) {
      return message.reply(`${a}  ❌\n${shabda[a].alt}  ✅`);
    }
  }
});

bot.login(process.env.TOKEN);
