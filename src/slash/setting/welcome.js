const { MessageEmbed } = require("discord.js");
const welcome = require("../../models/welcome");

module.exports = {
  data: {
    name: "welcome",
    description: "Setup the welcome configuration for your server",
    options: [
      {
        name: "enable",
        description: "Enable the welcome module for your server",
        type: 1,
        options: [
          {
            name: "channel",
            description: "Channel where you want welcome messages",
            type: 7,
            required: true,
          },
        ],
      },
      {
        name: "disable",
        description: "Disable the welcome module for your server",
        type: 1,
      },
      {
        name: "set-message",
        description: "Change the welcome message for your server",
        type: 1,
        options: [
          {
            name: "message",
            description:
              "The welcome message, keys : {mention} {user} {server} {members} {newline}",
            type: 3,
            required: true,
          },
        ],
      },
      {
        name: "set-image",
        description: "Change the welcome image for your server",
        type: 1,
        options: [
          {
            name: "image",
            description: "Valid imgur link starting with https://i.imgur.com/",
            type: 3,
            required: true,
          },
        ],
      },
    ],
  },
  permissions: ["MANAGE_SERVER"],

  run: async (bot, interaction) => {
    const data =
        (await welcome.findOne({ guildID: interaction.guildId })) ||
        (await welcome.create({ guildID: interaction.guildId })),
      channel = interaction.options.getChannel("channel"),
      message = interaction.options.getString("message"),
      image = interaction.options.getString("image");
    command = interaction.options.getSubcommand();

    if (command === "enable") {
      if (data.enabled && data.channelID === channel.id)
        return interaction.reply({
          content: "This server already has a welcome module enabled!",
          ephemeral: true,
        });

      if (
        !channel ||
        (channel.type !== "GUILD_TEXT" && channel.type !== "GUILD_NEWS")
      )
        return interaction.reply({
          content:
            "Invalid channel provided, please provide a valid text channel",
          ephemeral: true,
        });

      await welcome.findOneAndUpdate(
        { guildID: interaction.guildId },
        { enabled: true, channelID: channel.id }
      );

      interaction.reply({
        content: `The welcome module is now enabled and the welcome channel is now setted to ${channel.toString()}`,
        ephemeral: true,
      });
    } else if (command === "disable") {
      if (!data.enabled || data.enabled !== true)
        return interaction.reply({
          content: "The welcome module is already disabled!",
          ephemeral: true,
        });

      await welcome.findOneAndUpdate(
        { guildID: interaction.guildId },
        { enabled: false }
      );

      interaction.reply({
        content: "The welcome module is now disabled!",
        ephemeral: true,
      });
    } else if (command === "set-message") {
      await welcome.findOneAndUpdate(
        { guildID: interaction.guildId },
        { message: message }
      );

      interaction.reply({
        content: `The welcome message is now settled. \n_ _\n${
          data.enabled === false ? "Note: The welcome module is disabled" : ""
        }`,
        ephemeral: true,
      });
    } else if (command === "set-image") {
      if (!image.startsWith("https://i.imgur.com"))
        return interaction.reply({
          content: "Invalid image provided, use imgur (i.imgur.com)",
          ephemeral: true,
        });
      
      

      await welcome.findOneAndUpdate(
        {
          guildID: interaction.guildId,
        },
        { image: image }
      );

      interaction.reply({
        content: "Set the welcome image background .",
        ephemeral: true,
      });
    }
  },
};
