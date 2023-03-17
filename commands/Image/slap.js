const Command = require('../../Base/Command.js');
const { Canvas: Canvacord } = require('canvacord');

class Slap extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'slap',
            aliases: ['batslap'],
            description: 'Slap someone',
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(' ')) || message.author;
        if (user === message.author) return message.reply('❌ | Tag someone!');

        const m = await message.reply('⏱ | Please wait...');
        const img = await Canvacord.slap(message.author.displayAvatarURL({ format: 'png', size: 2048 }), user.displayAvatarURL({ format: 'png', size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply({ files: [img] });
    }

}

module.exports = Slap;