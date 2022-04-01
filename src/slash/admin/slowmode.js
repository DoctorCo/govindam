const Utils = require("../../../constructors/Utils");

module.exports = {
  data: {
    name: "slowmode",
    description: "Set the slowmode of a channel",
    options: [
      {
        name: "amount",
        description: "Select the amount of time to set the slowmode",
        type: "INTEGER",
        required: true,
      },
    ],
  },

  run: async (bot, interaction) => {
    const amt = parseInt(interaction.options.getInteger("amount"));

    if (isNaN(amt))
      return interaction.reply({
        content: "Amount must be an number",
        ephemeral: true,
      });
    if (amt < 0)
      return interaction.reply({
        content: "Amount must be a positive number",
        ephemeral: true,
      });

    
  },
};
