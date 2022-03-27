module.exports = (bot, message) => {
  if (message.author.bot || !message.content.startsWith("?")) return;

  const args = message.content.slice(1).split(/ +/g),
    cmd = args.shift()?.toLowerCase(),
    command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd)); 

  if (!command || !command.run) return;

  try {
    command.run(bot, message, args);
  } catch (e) {
    console.log(e);
  }
};
