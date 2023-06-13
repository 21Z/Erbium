const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class UserInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "userinfo",
            aliases: ["whois", "user-info", "user"],
            description: "User information",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const embed = createEmbed("info")
            .setAuthor({ name: "User Information", iconURL: message.guild.iconURL() })
            .setThumbnail(user.displayAvatarURL({ size: 4096 }))
            .addFields(
                { name: "Name", value: user.username, inline: true },
                { name: "Discriminator", value: user.discriminator, inline: true },
                { name: "Type", value: user.bot ? "Bot" : "User", inline: true },
                { name: "ID", value: user.id, inline: true },
                { name: "Created At", value: user.createdAt.toString() },
            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }

}

module.exports = UserInfo;
