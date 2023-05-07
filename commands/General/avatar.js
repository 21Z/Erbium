const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Avatar extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "avatar",
            aliases: ["av", "pfp"],
            description: "Shows avatar of the specified user.",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;
        const embed = createEmbed("info")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setTitle("Avatar")
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }

}

module.exports = Avatar;
