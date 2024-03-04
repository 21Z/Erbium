const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class TagInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "taginfo",
            aliases: ["tag-info", "abouttag", "tag"],
            description: "Shows tag info",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname) return message.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (!await this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        const tag = await this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`);
        const tagAuthor = await this.client.resolveUser(tag.author);

        const embed = createEmbed("info")
            .setAuthor({ name: "Tag Info", iconURL: message.guild.iconURL() })
            .setTitle("Content")
            .setDescription(tag.content)
            .addFields(
                { name: "Name", value: tag.name, inline: true },
                { name: "Author", value: tagAuthor ? `${tagAuthor.tag} [\`${tagAuthor.id}\`]` : `\`Unknown User#0000 [\`${tag.author}\`]`, inline: true },
                { name: "Total Uses", value: tag.uses.toLocaleString(), inline: false },
                { name: "Created At", value: `<t:${Math.floor(tag.createdAt / 1000)}:F>`, inline: true },

            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }

}

module.exports = TagInfo;
