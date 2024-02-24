const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");
const ms = require("ms");

class TimeOut extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "timeout",
            aliases: ["tm", "mute", "m"],
            description: "Timeout a user.",
            usage: "{command} <member> <duration> [reason]",
            botPerms: ["ModerateMembers", "EmbedLinks"],
            permissions: ["ModerateMembers"],
        });
    }

    async run(message, args) {
        let user = args[0];
        if (/<@!?(.*?)>/g.test(user)) user = user.match(/<@!?(.*?)>/g)[0].replace(/[<@!>]/g, "");
        const target = await message.guild.members.fetch(user).catch(() => {});
        const moderator = `by ${message.author.tag} [ID: ${message.author.id}]`;
        const embedreason = args.slice(2).join(" ") || "None";
        let reason = args.slice(2).join(" ") || "Timed Out " + moderator;
        if (reason === args.slice(2).join(" ")) reason = reason + ", " + moderator;
        if (!target) return message.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to timeout!")] });

        if (target.id === message.author.id) return message.reply({ embeds: [createEmbed("error", "You can not timeout yourself!", true)] });
        if (target.id === message.guild.ownerId) return message.reply({ embeds: [createEmbed("error", "You can not timeout the server owner!", true)] });
        if (message.guild.members.cache.has(target.id) && target.roles.highest.position > message.member.roles.highest.position) {
            return message.reply({ embeds: [createEmbed("error", "You cannot timeout someone with a higher role than yours!", true)] });
        }

        if (!args[1]) return message.reply({ embeds: [createEmbed("error", "You must specify a duration!", true).setFooter({ text: `Usage: ${this.client.config.PREFIX}timeout <member> <duration> [reason]` })] });
        const lastletter = args[1].slice(-1);
        let time = ms(args[1]) / 1000;
        if (!["ms", "s", "m", "h", "d", "y"].includes(lastletter)) time = args[1];

        if (isNaN(time)) {
            return message.reply({ embeds: [createEmbed("error", `**${time}** is not a valid number!`, true)
                .setFooter({ text: `Usage: ${this.client.config.PREFIX}timeout <member> <duration> [reason]` })] });
        }
        if (time == 0) time = null;
        if (!time) {
            return message.reply({ embeds: [ createEmbed("error", "You must specify a valid duration! units: `s`, `m`, `h`, `d` (eg. `1d`)", true)
                .setFooter({ text: `Usage: ${this.client.config.PREFIX}timeout <member> <duration> [reason]` })] });
        }
        if (time > 2419200) return message.reply({ embeds: [createEmbed("error", "Time is too high, please set a timeout duration less than 4 weeks!", true)] });

        const embed = createEmbed("error")
            .setTitle("Action: Timeout")
            .setDescription(`Timed Out ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)
            Duration: \`${this.client.utils.formatDuration(time * 1000)}\`
            Reason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Timed Out by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await target.timeout(time * 1000, reason).then(() => {
            message.channel.send({ embeds: [embed] });
        });
    }

}

module.exports = TimeOut;
