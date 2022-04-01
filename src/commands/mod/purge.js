const { Permissions } = require("discord.js");

module.exports.run = async (bot, message, args) => {

  const amt = parseInt(args[0]);

  if (message.deletable) message.delete();

  if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    return message
      .reply("Purge amount must be an integer!")
      .then((m) => m.delete(5000));
  }

  let deleteAmount;
  if (amt > 100) {
    deleteAmount = 100;
  } else {
    deleteAmount = amt;
  }

  message.channel.bulkDelete(deleteAmount, true);

  message.channel
    .send(`Purged **${deleteAmount}** messages from this channel!`)
    .then((m) => m.delete(5000));
};

module.exports.config = {
  name: "purge",
  aliases: ["clear", "clean"],
  botperms: "MANAGE_CHANNELS",
  userperms: "MANAGE_CHANNELS",
};
