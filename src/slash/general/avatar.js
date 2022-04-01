const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "avatar",
    description: "Get a user's avatar!",
    options: [
      {
        name: "user",
        description: "Select the user to get their avatar",
        type: "USER",
        required: false,
      },
    ],
  },

  run: async (bot, interaction) => {
    const user = interaction.options.getUser("user");

    if (user) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: user.tag,
              iconURL: user.displayAvatarURL({ dynamic: false }),
            })
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor("#2f3136"),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: false }),
            })
            .setImage(
              interaction.member.displayAvatarURL({ dynamic: true, size: 256 })
            )
            .setColor("#2f3136"),
        ],
      });
    }
  },
};
