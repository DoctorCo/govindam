const { Client, Message, MessageAttachment } = require("discord.js");
const canva = require("../../../constructors/Struct");

module.exports.run = async (bot, message, args) => {

  bot.emit("guildMemberAdd", message.member);
  message.reply("ye")
};

module.exports.config = {
  name: "test",
  aliases: ["simjoin"],
};
