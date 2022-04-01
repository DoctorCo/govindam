const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const member =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      (x) => x.user.username.toLowerCase() === args[0]
    );

  if (!member.bannable) return message.reply("I cannot ban that member!")

  if (!member)
    return message
      .reply("Whom do you wanna ban <:think:943893427446251550>")
      .then((v) => v.delete({ timeout: 5000 }));

  if (member.id === message.author.id)
    return message.reply(
      "Why do you want to ban yourself <a:dundundun:957871172144463902>"
    );

  if (member.id === bot.user.id)
    return message.reply("Adharmi Detected, Opinion Rejected.");

  let whyto = args.slice(2).join(" ") || "No reason provided";

  if (whyto.length > 32)
    return message.reply(
      "Reason must be less than `32` words including spaces."
    );
  

  try {
    member.ban({ reason: whyto }).then(() => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setThumbnail(member.displayAvatarURL())
            .setColor("ORANGE")
            .setDescription("Banned by: " + message.author.tag)
            .addField(`For :-`, `\`\`\`${whyto}\`\`\``),
        ],
      });
    });
  } catch {
    return message.reply("I cannot't ban that member");
  }
};

module.exports.config = {
  name: "ban",
  aliases: [],
  userperms: "BAN_MEMBERS",
  botperms: "BAN_MEMBERS",
};
