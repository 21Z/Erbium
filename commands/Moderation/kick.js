const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Kick extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "kick",
            aliases: ["k"],
            description: "Kick a user from the server",
            botPerms: ["KickMembers", "EmbedLinks"],
            permissions: ["KickMembers"],
        });
    }

    async run(message, args) {
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => {});
        const moderator = `by ${message.author.tag} [ID: ${message.author.id}]`;
        const embedreason = args.slice(1).join(" ") || "None";
        let reason = args.slice(1).join(" ") || "Kicked " + moderator;
        if (reason === args.slice(1).join(" ")) reason = reason + ", " + moderator;
        if (!target) return message.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to kick!")] });

        if (target.id === message.author.id) return message.reply({ embeds: [createEmbed("error", "You can not kick yourself!", true)] });
        if (target.id === message.guild.ownerId) return message.reply({ embeds: [createEmbed("error", "You can not kick the server owner!", true)] });
        if (message.guild.members.cache.has(target.id) && target.roles.highest.position > message.member.roles.highest.position) {
            return message.reply({ embeds: [createEmbed("error", "You cannot kick someone with a higher role than yours!", true)] });
        }
        if (!target.kickable) return message.reply({ embeds: [createEmbed("error", "I cannot kick this user!", true)] });

        const embed = createEmbed("error")
            .setTitle("Action: Kick")
            .setDescription(`Kicked ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)\nReason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Kicked by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await message.guild.members.kick(target.id, { reason: reason }).then(() => {
            message.channel.send({ embeds: [embed] });
        });
    }

}

module.exports = Kick;
