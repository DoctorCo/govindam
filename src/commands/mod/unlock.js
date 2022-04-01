const { Permissions } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
    return;
  const channel =
    message.channel ||
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]) ||
    message.guild.channels.cache.find((u) => u.name === args[0]);
  if (!channel)
    return message.reply("Couldn't find that channel or no channel mentioned.");

  let msg = await message.reply("Please wait for some time...");

  try {
    channel.permissionOverwrites.edit(
      message.guild.roles.cache.find(
        (e) => e.name.toLowerCase().trim() === "verified"
      ),
      { SEND_MESSAGES: true }
    );
    msg.edit(`:unlock: || ${channel.toString()} is unlocked`);
  } catch (e) {
    message.reply(`:x: ${e}`);
  }
};

module.exports.config = {
  name: "unlock",
  aliases: [],
  botperms: "MANAGE_CHANNELS",
  userperms: "MANAGE_CHANNELS",
};
