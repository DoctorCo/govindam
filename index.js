const { Client } = require("discord.js");
const { config } = require('dotenv');
const messages = require('./db.json');

config();

const bot = new Client({
  intents: 32767,
});

bot.on("ready", () => {
  console.log(`${bot.user.tag} is online!`);
});

bot.on("messageCreate", (message) => {
  if (message.author.id === bot.user.id) return;

  const match = messages.filter(v => message.toLowerCase().includes(v.toLowerCase()));

  if (match.length === 0) return;

  message.reply(`❌ ${match.map(v => v.wrong).join(", ")}\n✅ ${match.map(v => v.right).join(", ")}`)
});

bot.login(process.env.TOKEN);