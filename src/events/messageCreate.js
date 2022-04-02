const messages = require("../data.json");

module.exports = (bot, message) => {
  if (message.author.bot || message.author.id === bot.user.id) return;

  const match = messages.filter(
    (v) =>
      message.content.toLowerCase() === v.wrong.toLowerCase() ||
      message.content
        .toLowerCase()
        .includes(" " + v.wrong.toLowerCase() + " ") ||
      message.content.endsWith(" " + v.wrong.toLowerCase()) ||
      message.content.startsWith(v.wrong.toLowerCase() + " ")
  );

  if (match.length === 0) return;

  message.reply({
    content: `❌ ${match.map((v) => v.wrong).join(", ")}\n✅ ${match
      .map((v) => v.right)
      .join(", ")}`,

    allowedMentions: {
      repliedUser: false,
    },
  });
};
