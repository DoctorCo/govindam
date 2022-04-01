const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const member =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      (x) => x.user.username.toLowerCase() === args[0]
    );

  if (!member)
    return message
      .reply("Whom do you wanna kick <:think:943893427446251550>")
      .then((v) => v.delete({ timeout: 5000 }));

  if (member.id === message.author.id)
    return message.reply(
      "Why do you want to kick yourself <a:dundundun:957871172144463902>"
    );

  if (member.id === bot.user.id)
    return message.reply("Adharmi Detected, Opinion Rejected.");

  let whyto = args.slice(1).join(" ") || "No reason provided";

  if (whyto.length > 32)
    return message.reply(
      "Reason must be less than `32` words including spaces."
    );

  try {
    member.kick({ reason: whyto }).then(() => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setThumbnail(member.displayAvatarURL())
            .setAuthor(`${member.username}#${member.discriminator}`)
            .setColor("ORANGE")
            .setDescription("Kicked by: " + message.author.tag)
            .addField(`For :-`, `\`\`\`${whyto}\`\`\``),
        ],
      });
    });
  } catch {
    return message.reply("I cannot't kick that member");
  }
};

module.exports.config = {
  name: "kick",
  aliases: [],
  userperms: "KICK_MEMBERS",
  botperms: "KICK_MEMBERS",
};
