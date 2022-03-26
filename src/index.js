const { readdirSync } = require('fs');
const { join } = require('path');
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

config();

const bot = new Client({
  intents: 32767,
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

bot.prefix = "!"
bot.commands = new Collection();
bot.categories = readdirSync(join(__dirname, "./commands"));

// Command Loader
for (let i = 0; i < bot.categories.length; i++) {
  const commands = readdirSync(join(__dirname, `./commands/${bot.categories[i]}`)).filter(file => file.endsWith(".js"));

  for (let j = 0; j < commands.length; j++) {
    const command = require(`./commands/${bot.categories[i]}/${commands[j]}`);
    
    if (!command || !command?.name || typeof (command?.run) !== "function") continue;

    console.log(`Added ${command.name} command`)

    command.category = bot.categories[i];

    bot.commands.set(command.name, command);
  }
}

// Event handler
readdirSync(join(__dirname, "./events")).forEach(file =>
  bot.on(file.split(".")[0], (...args) => require(`./events/${file}`)(bot, ...args))
);

bot.login(process.env.TOKEN);