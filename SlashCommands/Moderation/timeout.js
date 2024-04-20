const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");
const { ApplicationCommandOptionType } = require("discord.js");
const ms = require("ms");

class TimeOut extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "timeout",
            aliases: ["tm", "mute", "m"],
            description: "Timeout a user.",
            botPerms: ["ModerateMembers"],
            permissions: ["ModerateMembers"],
            options: [
                {
                    name: "user",
                    description: "The user who you want to timeout",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "duration",
                    description: "The duration to timeout the user (upto 28d)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason why you want to timeout the user",
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        await interaction.deferReply();
        const target = interaction.options.getMember("user");
        const duration = interaction.options.getString("duration");
        const intialreason = interaction.options.getString("reason");
        const moderator = `by ${interaction.user.tag} [ID: ${interaction.user.id}]`;
        const reason = intialreason ? intialreason + ", " + moderator : "Timed Out " + moderator;
        const embedreason = intialreason || "None";
        if (!target) return interaction.editReply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to timeout!")] });

        if (target.id === interaction.user.id) return interaction.editReply({ embeds: [createEmbed("error", "You can not timeout yourself!", true)] });
        if (target.id === interaction.guild.ownerId) return interaction.editReply({ embeds: [createEmbed("error", "You can not timeout the server owner!", true)] });
        if (target.roles.highest.position > interaction.member.roles.highest.position) {
            return interaction.editReply({ embeds: [createEmbed("error", "You cannot timeout someone with a higher role than yours!", true)] });
        }
        if (!target.moderatable) return interaction.editReply({ embeds: [createEmbed("error", "I cannot timeout this user!")] });

        const lastletter = duration.slice(-1);
        let time = ms(duration) / 1000;
        if (!["ms", "s", "m", "h", "d", "y"].includes(lastletter)) time = duration;

        if (isNaN(time)) {
            return interaction.editReply({ embeds: [createEmbed("error", `**${time}** is not a valid number!`, true)
                .setFooter({ text: `Usage: ${this.client.config.PREFIX}timeout <member> <duration> [reason]` })] });
        }
        if (time == 0) time = null;
        if (!time) {
            return interaction.editReply({ embeds: [ createEmbed("error", "You must specify a valid duration! units: `s`, `m`, `h`, `d` (eg. `1d`)", true)
                .setFooter({ text: `Usage: ${this.client.config.PREFIX}timeout <member> <duration> [reason]` })] });
        }
        if (time > 2419200) return interaction.editReply({ embeds: [createEmbed("error", "Time is too high, please set a timeout duration less than 4 weeks!", true)] });

        const embed = createEmbed("error")
            .setTitle("Action: Timeout")
            .setDescription(`Timed Out ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)
            Duration: \`${this.client.utils.formatDuration(time * 1000)}\`
            Reason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Timed Out by ${interaction.user.tag}`,
                iconURL: interaction.member.displayAvatarURL(),
            });

        await target.timeout(time * 1000, reason).then(() => {
            interaction.editReply({ embeds: [embed] });
        });
    }

}

module.exports = TimeOut;
