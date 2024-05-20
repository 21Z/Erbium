const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");
const ms = require("ms");

class SlowMode extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "slowmode",
            description: "Set slowmode for the current channel",
            botPerms: ["ManageChannels"],
            permissions: ["ManageChannels"],
            options: [
                {
                    name: "duration",
                    description: "Time to slowmode (ex. 15s) (type \"off\" to turn off)",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "channel",
                    description: "The channel to set slowmode for",
                    type: ApplicationCommandOptionType.Channel,
                },
            ],
        });
    }

    async run(interaction) {
        const duration = interaction.options.getString("duration");
        const channel = interaction.options.getChannel("channel") ?? interaction.channel;
        const currentSlowmode = interaction.channel.rateLimitPerUser;
        if (duration === "off") {
            if (currentSlowmode === 0) {
                return interaction.reply({ embeds: [createEmbed("error", "Slowmode is already off!", true)] });
            }
            interaction.reply({ embeds: [createEmbed("success", "Slowmode has been turned off!", true)] });
            return channel.setRateLimitPerUser(0);
        }
        const lastletter = duration.slice(-1);
        let time = ms(duration) / 1000;
        if (!["ms", "s", "m", "h", "d", "y"].includes(lastletter)) time = duration;

        if (!time) {
            return interaction.reply({ embeds: [createEmbed("error", "You must enter a valid time! Available units: `s`, `m`, or `h`", true)
                .setFooter({ text: `Usage:  ${this.client.config.PREFIX}slowmode <time>` })] });
        }
        if (isNaN(time)) {
            return interaction.reply({ embeds: [createEmbed("error", `**${time}** is not a valid number!`, true)
                .setFooter({ text: `Usage:  ${this.client.config.PREFIX}slowmode <time>` })] });
        }
        if (time > 21600) return interaction.reply({ embeds: [createEmbed("error", "Time is too high, please set a slowmode less than 6 hours!", true)] });

        await channel.setRateLimitPerUser(time).catch(e => {
            console.error(e);
            return interaction.reply({ embeds: [createEmbed("error", `Something went wrong!\n\`\`\`js\n${e}\`\`\``, true)] });
        }).then(() => {
            interaction.reply(`Slowmode set to \`${this.client.utils.formatDuration(time * 1000).replace(/,/g, "")}\``);
        });
    }

}

module.exports = SlowMode;
