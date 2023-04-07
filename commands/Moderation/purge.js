const { EmbedBuilder } = require('discord.js');
const Command = require('../../Base/Command');

class Purge extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'purge',
            aliases: ['bulkdelete', 'bulkdel', 'sweep', 'clear'],
            description: 'Purge messages in the current channel!',
            botPerms: ['ManageMessages', 'EmbedLinks'],
            permissions: ['ManageMessages'],
        });
    }

    async run(message, args) {
        const embedColor = this.client.config.EMBED_COLOR;

        const query = args[0];
        if (parseInt(query) === 1) return message.reply('❌ | If you want to purge one message, please do it manually.');
        if (!query || isNaN(query) || parseInt(query) < 1) {
            return message.reply('❌ | Please specify a valid amount of messages to delete!');
        }
        await message.delete();

        const amount = parseInt(query);
        const messages = await message.channel.messages.fetch({ limit:amount });
        await message.channel.bulkDelete(messages, true).then(
            message.channel.send({ embeds: [new EmbedBuilder().setColor(embedColor).setTitle(`:broom: Successfully deleted ${amount} messages!`)] }).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 3000);
            }),
        );
    }
}

module.exports = Purge;