// Command Handler
module.exports = (bot, message) => {
    if (message.author.bot || !message.content.startsWith(bot.prefix)) return;

    const args = message.content.slice(1).split(/ +/g),
        cmd = args.shift()?.toLowerCase(),
        command = bot.commands.get(cmd);

    if (!command) return;

    command.run(bot, message, args);
}