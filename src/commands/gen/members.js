
module.exports.run = async (bot, message, args) => {
  var member = message.mentions.users.first() || message.member;

  message.reply(`There are ${message.guild.members.size} in this server`)
};

module.exports.config = {
  name: "membercount",
  aliases: ["members", "usercount"],
  botperms: "SEND_MESSAGES",
  userperms: "SEND_MESSAGES",
};
