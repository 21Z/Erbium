const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Ban extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "ban",
            aliases: ["b"],
            description: "Ban a user from the server",
            botPerms: ["BanMembers", "EmbedLinks"],
            permissions: ["BanMembers"],
        });
    }

    async run(message, args) {
        let target = await this.client.resolveUser(args[0]);
        const intialreason = args.slice(1).join(" ");
        const moderator = `by ${message.author.tag} [ID: ${message.author.id}]`;
        const reason = intialreason ? intialreason + ", " + moderator : "Banned " + moderator;
        const embedreason = intialreason || "None";
        if (!target) return message.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to ban!")] });

        if (target.id === message.author.id) return message.reply({ embeds: [createEmbed("error", "You can not ban yourself!", true)] });
        if (target.id === message.guild.ownerId) return message.reply({ embeds: [createEmbed("error", "You can not ban the server owner!", true)] });
        if (await message.guild.members.fetch(target.id).catch(() => {})) {
            target = await message.guild.members.fetch(target.id);
            if (target.roles.highest.position > message.member.roles.highest.position) {
                return message.reply({ embeds: [createEmbed("error", "You cannot ban someone with a higher role than yours!", true)] });
            }
            if (!target.bannable) return message.reply({ embeds: [createEmbed("error", "I cannot ban this user!", true)] });
        }

        // If the user is already banned
        const bans = await message.guild.bans.fetch();
        if (bans.some((m) => m.user.id === target.id)) return message.reply({ embeds: [createEmbed("error", `${target} is already banned!`, true)] });

        const embed = createEmbed("error")
            .setTitle("Action: Ban")
            .setDescription(`Banned ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)\nReason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Banned by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await message.guild.bans.create(target.id, { reason: reason }).then(() => {
            message.reply({ embeds: [embed] });
        });
    }

}

module.exports = Ban;
