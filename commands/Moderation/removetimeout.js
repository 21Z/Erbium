const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class RemoveTimeOut extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "removetimeout",
            aliases: ["remtm", "deltimeout", "deltm", "removetm", "unmute", "unm"],
            description: "Remove Timeout from a user.",
            usage: "{command} <member> [reason]",
            botPerms: ["ModerateMembers", "EmbedLinks"],
            permissions: ["ModerateMembers"],
        });
    }

    async run(message, args) {
        let user = args[0];
        if (/<@!?(.*?)>/g.test(user)) user = user.match(/<@!?(.*?)>/g)[0].replace(/[<@!>]/g, "");
        const target = await message.guild.members.fetch(user).catch(() => {});
        const moderator = `by ${message.author.tag} [ID: ${message.author.id}]`;
        const embedreason = args.slice(1).join(" ") || "None";
        let reason = args.slice(1).join(" ") || "Timed Out " + moderator;
        if (reason === args.slice(1).join(" ")) reason = reason + ", " + moderator;
        if (!target) return message.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to remove timeout from!")] });

        if (target.id === message.guild.ownerId) return message.reply({ embeds: [createEmbed("error", "You can not timeout the server owner!", true)] });
        if (message.guild.members.cache.has(target.id) && target.roles.highest.position > message.member.roles.highest.position) {
            return message.reply({ embeds: [createEmbed("error", "You cannot remove timeout from someone with a higher role than yours!", true)] });
        }

        const embed = createEmbed("error")
            .setTitle("Action: Remove Timeout")
            .setDescription(`Timeout Removed from ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)
            Reason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Timeout Removed by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await target.timeout(null, reason).then(() => {
            message.channel.send({ embeds: [embed] });
        });
    }

}

module.exports = RemoveTimeOut;
