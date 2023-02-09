const Command = require('../../Base/Command');
const ms = require('ms');

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
        const lastletter = args[0].slice(-1);
        let time = ms(args[0]) / 1000;
        if (lastletter !== 's' && lastletter !== 'm' && lastletter !== 'h') time = args[0];
        const reason = args[1] ? args.slice(1).join(' ') : '';
        const currentSlowmode = message.channel.rateLimitPerUser;
        if (args[0] === 'off') {
            if (currentSlowmode === 0) {
                return message.reply('❌ | Slowmode is already off!');
            }
            message.reply('Slowmode has been turned off!');
            return message.channel.setRateLimitPerUser(0, reason);
        }
        if (!time) {
            return message.reply('❌ | You must enter a valid time! Available units: `s`, `m`, or `h`');
        }
        if (isNaN(time)) {
            return message.reply(`❌ | **${time}** is not a valid number! \nUsage: \`.slowmode <time>\``);
        }
        if (time > 21600) return message.reply('❌ | Time is too high, please set a slowmode less than 6 hours!');
        message.channel.setRateLimitPerUser(time).catch(e => {
            return message.reply(`❌ | Oops, Something went wrong!\n ${e}`);
        });
        message.reply(`Slowmode set to \`${ms(time * 1000, { long: true })}\``);
    }
}

module.exports = SlowMode;