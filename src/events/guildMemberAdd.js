const canva = require("../../constructors/Struct");
const welcomedb = require("../models/welcome");
const { MessageAttachment } = require("discord.js");

module.exports = async (bot, member) => {
  const data = await welcomedb.findOne({ guildId: member.guild.id });
  const channel = member.guild.channels.cache.get(data?.channelID);
  const image = data?.image;

  if (!channel || data?.enabled !== true) return;

  let welcomer = await canva.welcome(member, {
    bgimg: image,
    shadow: true,
    theme: "light",
    blur: true,
  });

  message = data.message
    .replace(/\{mention\}/g, member.user.toString())
    .replace(/\{user\}/g, member.user.username)
    .replace(/\{server\}/g, member.guild.name)
    .replace(/\{members\}/g, member.guild.memberCount)
    .replace(/\{newline\}/g, "\n");

  const attachment = new MessageAttachment(welcomer, `welcome.jpg`);

  channel.send({
    content: message,
    files: [attachment],
  });
};
