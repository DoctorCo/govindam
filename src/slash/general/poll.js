const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "poll",
    description: "Make a cool poll",
    options: [
      {
        name: "question",
        description: "The question of the poll",
        type: "STRING",
        required: true,
      },
    ],
  },

  permissions: ["MANAGE_MESSAGES"],

  run: async (bot, interaction) => {
    const content = interaction.options
      .getString("question")
      .replace(/\{newline\}/g, "\n_ _");

    const message = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("#2f3136")
          .setTitle(content + "\n\n\n")
          .setDescription(
            `<:plus_1:957889403026546738> Yes\n<:minus_1:957889402749718548> No`
          )
          .setFooter({
            text: `Poll by ${interaction.member.user.tag} • ${interaction.member.guild.name}`,
          }),
      ],

      fetchReply: true,
    });

    message.react("<:plus_1:957889403026546738>");
    message.react("<:minus_1:957889402749718548>");
  },
};
