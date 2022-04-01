module.exports = (bot) => {
  console.log(`${bot.user.tag} is online!`);

  bot.user.setPresence({
    activities: [{ name: "Bhagavad Geeta", type: "LISTENING" }],
  });
  bot.application.commands.set(
    [...bot.slash.map((v) => v.data)],
    "956558892161171516"
  );
};
