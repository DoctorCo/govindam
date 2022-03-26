const { Client, MessageAttachment } = require("discord.js");
const { config } = require("dotenv");
const messages = require("./db.json");
const utils = require("./Util");
const canva = new utils();

config();

const bot = new Client({
  intents: 32767,
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

bot.on("ready", () => {
  console.log(`${bot.user.tag} is online!`);
});

bot.on("messageCreate", (message) => {
  if (message.author.id === bot.user.id) return;

  const match = messages.filter((v) =>
    message.content.toLowerCase().includes(v.wrong.toLowerCase())
  );

  if (match.length === 0) return;

  message.reply(
    `❌ ${match.map((v) => v.wrong).join(", ")}\n✅ ${match
      .map((v) => v.right)
      .join(", ")}`
  );
});

bot.on("messageCreate", (message) => {
  const command = (name) =>
    message.content.toLowerCase().startsWith("!" + name);

  if (command("help")) {
    message.reply("namaskaram");
  }

  if (command("test")) {
    let welcomer = canva.welcome(message.member, {
      bgimg: "https://cdn.discordapp.com/attachments/955519944882274405/957143572304502824/adiyogi.png",
      shadow: true,
      theme: "light",
      blur: false,
    });

    const attachment = new MessageAttachment(welcomer, `welcome.jpg`);

    message.channel.send({
      content: `Welcome ${message.member.toString()} Hope you enjoy your stay!`,
      files: [attachment],
    });
  }
});

bot.login(process.env.TOKEN);
