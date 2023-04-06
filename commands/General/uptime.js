const Command = require('../../Base/Command.js');
const { EmbedBuilder } = require('discord.js');

class Uptime extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'uptime',
            aliases: ['ut'],
            description: 'Bot uptime',
            botPerms: ['EmbedLinks'],
            cooldown: 5000,
        });
    }

    async run(message) {
        const embed = new EmbedBuilder()
            .setTitle('Bot Uptime')
            .setDescription(this.client.utils.formatDuration(this.client.uptime))
            .setColor(0x4d5e94)
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }

}

module.exports = Uptime;
