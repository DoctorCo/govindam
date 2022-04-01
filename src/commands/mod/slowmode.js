const Utils = require("../../../constructors/Utils");

module.exports.run = async (bot, message, args) => {
  const amount = parseInt(args[0]);

  if (isNaN(amount)) return message.channel.send("Amount must be an number");

  if (args[0] === amount + `s`) {
    message.channel.setRateLimitPerUser(amount);
    message.channel.send(
      `<:tick:957683001536417792> | Set slowmode to ${amount} second${Utils.plural(
        amount
      )}`
    );
  } else if (args[0] === amount + "m") {
    message.channel.setRateLimitPerUser(amount * 60);
    message.channel.send(
      `<:tick:957683001536417792> | Set slowmode to ${amount} minute${Utils.plural(
        amount
      )}`
    );
  } else if (args[0] === amount + "h") {
    message.channel.setRateLimitPerUser(amount * 60 * 60);
    message.channel.send(
      `<:tick:957683001536417792> | Set slowmode to ${amount} hour${Utils.plural(
        amount
      )}`
    );
  } else {
    return message.channel.send(
      "<:cross:957683008473796658> | Value must be in hours, minutes, seconds"
    );
  }
};

module.exports.config = {
  name: "slow-mode",
  aliases: ["sm", "slowmode"],
  botperms: "MANAGE_CHANNELS",
  userperms: "MANAGE_CHANNELS",
};
