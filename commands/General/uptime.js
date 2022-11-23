const Command = require('../../Base/Command.js');
const { MessageEmbed } = require('discord.js');

class Uptime extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'uptime',
            aliases: ['ut'],
            description: 'Bot uptime',
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle('Bot Uptime')
            .setDescription(this.client.utils.formatDuration(this.client.uptime))
            .setColor(0x4d5e94)
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }

}

module.exports = Uptime;