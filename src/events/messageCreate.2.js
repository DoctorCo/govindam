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

    if (message.guild.id === "956558892161171516") {
      message.guild.channels.cache
        .get("959432574952939580")
        .send(
          `Congrats, <@${message.author.id}>! You've leveled up to level ${user.level}!`
        );
    } else {
      message.reply({
        content: `Congrats, you leveled up to level ${user.level}!`,
        allowedMentions: { repliedUser: false },
      });
    }
  }
};
