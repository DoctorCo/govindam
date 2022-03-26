const { Client } = require("discord.js");
const { config } = require("dotenv");

config();

const bot = new Client({
  intents: 32767,
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

bot.prefix = "!"
bot.commands = new Discord.Collection();
bot.categories = readdirSync(join(__dirname, "./commands"));

// Event handler
readdirSync(join(__dirname, "./events")).forEach(file =>
    bot.on(file.split(".")[0], (...args) => require(`./events/${file}`)(client, ...args))
);

// Command Loader
for (let i = 0; i < bot.categories.length; i++) {
    const commands = readdirSync(join(__dirname, `./commands/${bot.categories[i]}`)).filter(file => file.endsWith(".js"));

    for (let j = 0; j < commands.length; j++) {
        const command = require(`./commands/${bot.categories[i]}/${commands[j]}`);
        if (!command || !command?.data?.name || typeof (command?.run) !== "function") continue;
        command.category = bot.categories[i];
        bot.commands.set(command.data.name, command);
    }
}

bot.login(process.env.TOKEN);