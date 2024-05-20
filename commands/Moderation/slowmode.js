const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");
const ms = require("ms");

class SlowMode extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "slowmode",
            aliases: ["sm", "setsm", "setslowmode"],
            description: "Set slowmode for the current channel",
            botPerms: ["ManageChannels", "EmbedLinks"],
            permissions: ["ManageChannels"],
        });
    }

    async run(message, args) {
        const currentSlowmode = message.channel.rateLimitPerUser;
        if (!args[0] || args[0] === "off") {
            if (currentSlowmode === 0) {
                return message.reply({ embeds: [createEmbed("error", "Slowmode is already off!", true)] });
            }
            message.reply({ embeds: [createEmbed("success", "Slowmode has been turned off!", true)] });
            return message.channel.setRateLimitPerUser(0);
        }
        const lastletter = args[0].slice(-1);
        let time = ms(args[0]) / 1000;
        if (!["ms", "s", "m", "h", "d", "y"].includes(lastletter)) time = args[0];

        if (!time) {
            return message.reply({ embeds: [createEmbed("error", "You must enter a valid time! Available units: `s`, `m`, or `h`", true)
                .setFooter({ text: `Usage:  ${this.client.config.PREFIX}slowmode <time>` })] });
        }
        if (isNaN(time)) {
            return message.reply({ embeds: [createEmbed("error", `**${time}** is not a valid number!`, true)
                .setFooter({ text: `Usage:  ${this.client.config.PREFIX}slowmode <time>` })] });
        }
        if (time > 21600) return message.reply({ embeds: [createEmbed("error", "Time is too high, please set a slowmode less than 6 hours!", true)] });

        message.channel.setRateLimitPerUser(time).catch(e => {
            console.error(e);
            return message.reply({ embeds: [createEmbed("error", `Something went wrong!\n\`\`\`js\n${e}\`\`\``, true)] });
        }).then(() => {
            message.reply(`Slowmode set to \`${this.client.utils.formatDuration(time * 1000).replace(/,/g, "")}\``);
        });
    }

}

module.exports = SlowMode;
