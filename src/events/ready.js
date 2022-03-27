module.exports = (bot) => {
  console.log(`${bot.user.tag} is online!`);

  bot.user.setPresence({
    activities: [{ name: "Bhagvad Geeta", type: "LISTENING" }],
  });
};
