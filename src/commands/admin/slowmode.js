const ms = require("ms");

module.exports = {
  data: {
    name: "slowmode",
    description: "Set the slowmode of a channel",
    options: [
      {
        name: "amount",
        description: "Select the amount of time to set the slowmode",
        type: "STRING",
        required: true,
      },
    ],
  },

  permissions: ["MANAGE_CHANNELS"],

  run: async (bot, interaction) => {
    const amt = parseInt(interaction.options.getString("amount"));
    const channel = interaction.channel;

    const milli = ms(amt);

    if (isNaN(milli))
      return interaction.reply({
        content:
          "<:cross:957683008473796658> | Value must be in hours, minutes, seconds",
        ephemeral: true,
      });

    if (milli < 1000)
      return interaction.reply({
        content:
          "<:cross:957683008473796658> | The minimum slowmode time is 1 second",
        ephemeral: true,
      });

    channel.setRateLimitPerUser(milli / 1000);
    interaction.reply({
      content: `<:tick:957683001536417792> | Set slowmode to ${ms(milli, {
        long: true,
      })}`,
    });
  },
};
