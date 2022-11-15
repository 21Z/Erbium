const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class Invite extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "invite",
            aliases: [],
            description: "Bot invite link"
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle("Bot Invite")
            .setDescription(`**[Click Here](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=388160)** to invite me`)
            .setColor(0x4d5e94)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        message.reply(embed);
    }

}

module.exports = Invite;