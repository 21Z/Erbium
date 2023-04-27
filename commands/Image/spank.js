const Command = require('../../Base/Command.js');
const createEmbed = require('../../utils/createEmbed.js');
const { Canvas: Canvacord } = require('canvacord');

class Spank extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'spank',
            aliases: [],
            description: 'Spank someone',
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(' ')) || message.author;
        if (user === message.author) return message.reply({ embeds: [createEmbed('error', 'Tag someone!', true)] });

        const m = await message.reply('⏱ | Please wait...');
        const img = await Canvacord.spank(message.author.displayAvatarURL({ format: 'png', size: 2048 }), user.displayAvatarURL({ format: 'png', size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply({ files: [img] });
    }

}

module.exports = Spank;