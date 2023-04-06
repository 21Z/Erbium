const Command = require('../../Base/Command.js');
const { EmbedBuilder } = require('discord.js');

class Invite extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'invite',
            aliases: ['inv'],
            description: 'Bot invite link',
            botPerms: ['EmbedLinks'],
        });
    }

    async run(message) {
        const embed = new EmbedBuilder()
            .setTitle('Bot Invite')
            .setDescription(`**[Click Here](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=277028916423&scope=bot%20applications.commands)** to invite me`)
            .setColor(0x4d5e94)
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }

}

module.exports = Invite;
