const Utils = require("../../constructors/Utils");

module.exports = (bot, message) => {
  if (message.author.bot || !message.content.startsWith(bot.prefix)) return;

  const args = message.content.slice(bot.prefix.length).split(/ +/g),
    cmd = args.shift()?.toLowerCase(),
    command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

  if (!command || !command.run) return;

  let config = command.config;

  if (config.userperms && !message.member.permissions.has(config.userperms)) {
    return message.channel.send(
      `Bhrata, I'm afraid you lack \` ${Utils.titlecase(
        config.userperms.replace("_", " ")
      )} \`  permission to run that.`
    );
  }

  if (config.botperms && !message.guild.me.permissions.has(config.botperms)) {
    return message.channel.send(
      `I lack \` ${Utils.titlecase(
        config.botperms.replace("_", " ")
      )} \` permission to run that.`
    );
  }

  try {
    command.run(bot, message, args);
  } catch (e) {
    message.reply(`:x: ${e}`);
  }
};
