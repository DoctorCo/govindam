const { Client, Message } = require('discord.js');

module.exports = {
    name: "help",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run(client, message, args) {
        message.reply("namaskaram")
    }
}