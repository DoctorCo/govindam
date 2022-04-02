const { MessageAttachment } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  data: {
    name: "rank",
    description: "Get the rank of a user",
    options: [
      {
        name: "user",
        description: "Select the user to know their rank",
        type: "USER",
        required: false,
      },
    ],
  },

  run: async (bot, interaction) => {
    const target =
      interaction.guild.members.cache.get(
        interaction.options.getUser("user")?.id
      ) || interaction.member;
    const user = await Levels.fetch(target.id, interaction.guild.id);

    if (!user || !user.xp)
      return interaction.reply(
        target === interaction.member
          ? "You do not have any xp yet!"
          : "This user does not have enough xp to show"
      );

    const neededxp = Levels.xpFor(parseInt(user.level) + 1);

    const rank = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
      .setUsername(target.nickname || target.user.username)
      .setStatus(
        target.presence?.status || target.user?.presence?.status || "online"
      )
      .setCurrentXP(user.xp)
      .setRequiredXP(neededxp)
      .setDiscriminator(target.user.discriminator)
      .setBackground("IMAGE", "https://i.imgur.com/26WAzO1.png")
      .setProgressBar("#f48530", "COLOR");
    rank.build().then((data) => {
      const attachment = new MessageAttachment(data, "rank.png");
      interaction.reply({ files: [attachment] });
    });
  },
};
