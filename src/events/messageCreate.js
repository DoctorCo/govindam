const messages = require("../db.json");

module.exports = (bot, message) => {
  if (message.author.id === bot.user.id) return;

  const match = messages.filter((v) =>
    message.content.toLowerCase().includes(v.wrong.toLowerCase())
  );

  if (message.content.toLowerCase().includes("sex")) message.delete();
  if (match.length === 0) return;

  message
    .reply(
      `❌ ${match.map((v) => v.wrong).join(", ")}\n✅ ${match
        .map((v) => v.right)
        .join(", ")}`
    )
};
