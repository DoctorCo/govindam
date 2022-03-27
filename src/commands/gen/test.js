const { Client, Message, MessageAttachment } = require("discord.js");
const canva = require("../../../constructors/Struct");

module.exports.run = async (bot, message, args) => {
  member = message.member;
  let welcomer = await canva.welcome(member, {
    bgimg: "https://i.imgur.com/zaN5mmf.png",
    shadow: true,
    theme: "light",
    blur: true,
  });

  const attachment = new MessageAttachment(welcomer, `welcome.jpg`);

  message.channel.send({
    content: `Welcome ${member.toString()} Hope you enjoy your stay!`,
    files: [attachment],
  });
};

module.exports.config = {
  name: "test",
  aliases: ["simjoin"],
};
