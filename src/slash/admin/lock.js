const Utils = require("../../../constructors/Utils");

module.exports = {
  data: {
    name: "lock",
    description: "Lock a channel",
    options: [
      {
        name: "channel",
        description: "Select the channel to lock",
        type: "CHANNEL",
        required: false,
      },
    ],
  },

  run: async (bot, interaction) => {
    const channel =
      interaction.options.getChannel("channel") || interaction.channel;

    if (channel.type !== "text")
      return interaction.reply({
        content: "Channel must be a text channel",
        ephemeral: true,
      });

    if (!channel.permissionsFor(bot.user).has("MANAGE_CHANNELS"))
      return interaction.reply({
        content: "I lack the permission to manage channels!",
        ephemeral: true,
      });
  },
};
