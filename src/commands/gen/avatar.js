const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let member = message.mentions.users.first();

  if (!member) member = message.member;

  let avatar = member.displayAvatarURL({
    dynamic: true,
    size: 1024,
  });
  let embed = new MessageEmbed()
    .setColor("#ff7b00")
    .setImage(avatar)
    .setAuthor({
      name: `${!member.displayName ? member.username : member.displayName}#${
        member.id === message.member.id
          ? member.user.discriminator
          : member.discriminator
      }`,
      iconURL: avatar,
    });

  message.reply({ embeds: [embed] });
};

module.exports.config = {
  name: "avatar",
  aliases: ["av", "pfp"],
  botperms: "SEND_MESSAGES",
  userperms: "SEND_MESSAGES",
};
