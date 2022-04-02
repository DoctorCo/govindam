module.exports = {
  data: {
    name: "status",
    description: "Change the bot's status!",
    options: [
      {
        name: "name",
        description: "What status do you want to change the bot to?",
        type: "STRING",
        required: true,
      },
      {
        name: "type",
        description: "What type of status do you want to change the bot to?",
        type: "STRING",
        required: false,
      },
    ],
  },

  run: async (bot, interaction) => {
    // if (interaction.user.id !== "725278824975040512")
    //   return interaction.reply({ content: `You are not a owner` });

    bot.user.setActivity({
      name: interaction.options.getString("name", true),
      type: interaction.options.getString("type", true) || "LISTENING",
    });

    interaction.reply({
      content: `Status changed to:  ${interaction.options.getString("name")}`,
    });
  },
};
