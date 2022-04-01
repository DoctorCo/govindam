const Levels = require("discord-xp");

module.exports = async (bot, message) => {
  const randomXp = Math.floor(Math.random() * 9) + 1;
  const hasLeveled = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXp
  );

  if (hasLeveled) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message
      .reply(`Congrats, you leveled up to level ${user.level}!`)
      .then((e) => e.delete({ timeout: 60000 }));
  }
};
