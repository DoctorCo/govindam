const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const Utils = require("./Utils");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = class Govindam extends Client {
  constructor(props) {
    super({
      intents: 32767,
      allowedMentions: { parse: ["users", "roles"], repliedUser: true },
      partials: ["REACTION", "MESSAGE", "CHANNEL"],
    });

    this.prefix = "g!";
    this.commands = new Collection();
    this.aliases = new Collection();
    this.slash = new Collection();
  }

  async start(token) {
    this.login(token);

    mongoose.connect(process.env.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // command handler
    let commandNames = await Utils.search(
      `${process.cwd()}/src/commands/**/*.js`
    );
    commandNames.forEach((f) => {
      const file = require(f);
      this.commands.set(file.config.name, file);
      file.config.aliases && 7;
      file.config.aliases.forEach((a) => {
        this.aliases.set(a, file.config.name);
      });
    });

    // event handler

    readdirSync(join(process.cwd(), "/src/events")).forEach((file) =>
      this.on(file.split(".")[0], (...args) =>
        require(`${process.cwd()}/src/events/${file}`)(this, ...args)
      )
    );

    let slashNames = await Utils.search(`${process.cwd()}/src/slash/**/*.js`);

    slashNames.forEach((f) => {
      const command = require(f);
      if (
        !command ||
        !command?.data?.name ||
        typeof command?.run !== "function"
      )
        return;
      this.slash.set(command.data.name, command);

      if (["MESSAGE", "USER"].includes(command.type))
        delete command.description;
    });
  }
};
