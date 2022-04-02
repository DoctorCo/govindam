const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "echo",
    description: "Make the bot repeat a sentence",
    options: [
      {
        name: "message",
        description: "message to speak",
        type: "STRING",
        required: true,
      },
    ],
  },

  run: async (bot, interaction) => {
    await interaction.reply({
      content: interaction.options.getString("message"),
    });
  },
};
