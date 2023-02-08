const Command = require('../../Base/Command');

class SlowMode extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'slowmode',
            aliases: ['sm', 'setsm', 'setslowmode'],
            description: 'Set slowmode for the current channel',
            permissions: ['MANAGE_CHANNELS'],
        });
    }

    async run(message, args) {
        const time = args[0];
        if (!time) {
            return message.reply('❌ | You must enter a valid time! Available units: `s`, `m`, `h` or `d`');
        }
        if (isNaN(time)) {
            return message.reply(`❌ | **${time}** is not a valid number! \nUsage: \`.slowmode <time>\``);
        }
    }
}

module.exports = SlowMode;