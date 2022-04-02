const db = require("../../models/warn.js");

module.exports = {
  data: {
    name: "warn",
    description: "Warn a misbehaving member",
    options: [
      {
        name: "user",
        description: "Select the member you want to warn",
        type: "USER",
        required: true,
      },
      {
        name: "reason",
        description: "Select the reason for the warning",
        type: "STRING",
        required: true,
      },
    ],
  },

  permissions: ["MANAGE_MEMBERS"],

  run: async (bot, interaction) => {
    const member = interaction.options.getUser("user"),
      reason = interaction.options.getString("reason");

    let data = await db.findOne({
      guildID: interaction.guildId,
      userID: member.id,
    });

    if (data) {
      data.punishments
        .unshift({
          ptype: "WARN",
          reason: reason,
          mod: interaction.author.id,
        })
        .save();

      interaction.reply({
        content: `${member.toString()} has been warned`,
      });
    } else if (!data) {
      new db({
        guildID: interaction.guildId,
        userID: member.id,
        punishments: [
          {
            ptype: "WARN",
            reason: reason,
            mod: interaction.author.id,
          },
        ],
      }).save();

      interaction.reply({
        content: `${member.toString()} has been warned`,
      });
    }
  },
};
