const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class RemoveTimeout extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "removetimeout",
            aliases: ["remtm", "deltimeout", "deltm", "removetm", "unmute", "untm", "unm"],
            description: "Remove timeout from a user.",
            usage: "{command} <member> [reason]",
            botPerms: ["ModerateMembers", "EmbedLinks"],
            permissions: ["ModerateMembers"],
        });
    }

    async run(message, args) {
        const target = await this.client.resolveUser(args[0], message.guild);
        const intialreason = args.slice(1).join(" ");
        const moderator = `by ${message.author.tag} [ID: ${message.author.id}]`;
        const reason = intialreason ? intialreason + ", " + moderator : "Timeout removed " + moderator;
        const embedreason = intialreason || "None";
        if (!target) return message.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to remove timeout from!")] });

        if (!target.isCommunicationDisabled()) return message.reply({ embeds: [createEmbed("error", "The user is not timed out!", true)] });
        if (target.roles.highest.position > message.member.roles.highest.position) {
            return message.reply({ embeds: [createEmbed("error", "You cannot remove timeout from someone with a higher role than yours!", true)] });
        }
        if (!target.moderatable) return message.reply({ embeds: [createEmbed("error", "I cannot remove timeout from this user!")] });

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
            message.reply({ embeds: [embed] });
        });
    }

}

module.exports = RemoveTimeout;
