const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "ping",
    description: "Get this bot's ping!",
    options: [],
  },

  run: async (bot, interaction) => {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("#2f3136")
          .setDescription(
            `
            _ _
            **Ping Latency** : ${Date.now() - interaction.createdTimestamp}ms
          \n**API Latency** : ${bot.ws.ping}ms`
          )
          .setTitle("🏓  Pong!"),
      ],
    });
  },
};
