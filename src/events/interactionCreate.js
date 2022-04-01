module.exports = async (bot, interaction) => {
  if (interaction.author === bot.user) return;
  try {
    if (!interaction.isCommand()) return;

    const cmd = bot.slash.get(interaction.commandName),
      member = interaction.guild.members.cache.get(interaction.member.id);

    if (!cmd || (!cmd.dm && !interaction.guild)) return;

    if (
      cmd.permissions?.length > 0 &&
      !cmd.permissions.some((v) => member.permissions.has(v))
    )
      return interaction.reply({
        content: `You lack ${cmd.permissions
          .toLowerCase()
          .replace("_", " ")
          .join(", ")} permission to use this command!`,
      });

    cmd.run(bot, interaction);
  } catch (e) {
    console.log(e);
  }
};
