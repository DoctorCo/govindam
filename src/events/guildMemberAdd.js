const canva = require("../../constructors/Struct");
const { MessageAttachment } = require("discord.js");

module.exports = async (bot, member) => {
  let welcomer = await canva.welcome(member, {
    bgimg: "https://i.imgur.com/zaN5mmf.png",
    shadow: true,
    theme: "light",
    blur: true,
  });

  const attachment = new MessageAttachment(welcomer, `welcome.jpg`);

  member.guild.channels.cache.get("956777800063385621").send({
    content: `Welcome ${member.toString()} Hope you enjoy your stay!`,
    files: [attachment],
  });
};
