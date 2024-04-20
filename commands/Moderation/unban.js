const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class UnBan extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "unban",
            aliases: ["unb"],
            description: "Unban a user from the server!",
            botPerms: ["BanMembers", "EmbedLinks"],
            permissions: ["BanMembers"],
        });
    }

    async run(message, args) {
        const target = await this.client.resolveUser(args[0]);
        const intialreason = args.slice(1).join(" ");
        const moderator = `by ${message.author.tag} [ID: ${message.author.id}]`;
        const reason = intialreason ? intialreason + ", " + moderator : "Unbanned " + moderator;
        const embedreason = intialreason || "None";
        if (!target) return message.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to unban!")] });

        // If the user is not banned
        const bans = await message.guild.bans.fetch();
        if (!bans.some((m) => m.user.id === target.id)) return message.reply({ embeds: [createEmbed("error", "The user you specified is not banned!", true)] });

        const embed = createEmbed("success")
            .setTitle("Action: Unban")
            .setDescription(`Unbanned ${target} (\`${target.tag}\`)\nReason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Unbanned by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await message.guild.bans.remove(target.id, reason).then(() => {
            message.reply({ embeds: [embed] });
        });
    }

}

module.exports = UnBan;
