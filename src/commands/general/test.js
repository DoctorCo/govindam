const { Client, Message, MessageAttachment } = require('discord.js');
const canva = new (require('../../Util'));

module.exports = {
    name: "test",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run(client, message, args) {
        let welcomer = await canva.welcome(message.member, {
            bgimg: "https://cdn.discordapp.com/attachments/955519944882274405/957143572304502824/adiyogi.png",
            shadow: true,
            theme: "light",
            blur: false,
        });

        const attachment = new MessageAttachment(welcomer, `welcome.jpg`);

        message.channel.send({
            content: `Welcome ${message.member.toString()} Hope you enjoy your stay!`,
            files: [attachment],
        });
    }
}