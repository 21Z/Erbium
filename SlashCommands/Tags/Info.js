const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class TagInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "info",
            description: "Shows tag info",
            options: [
                {
                    name: "tag",
                    description: "The tag whom's info should be shown",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
            subcommand: true,
        });
    }

    async run(interaction) {
        const tagname = interaction.options.getString("tag");

        if (!tagname) return interaction.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (!await this.client.database.tags.has(`${tagname.toLowerCase()}_${interaction.guild.id}`)) return interaction.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        const tag = await this.client.database.tags.get(`${tagname.toLowerCase()}_${interaction.guild.id}`);
        const tagAuthor = await this.client.resolveUser(tag.author);

        const embed = createEmbed("info")
            .setAuthor({ name: "Tag Info", iconURL: interaction.guild.iconURL() })
            .setTitle("Content")
            .setDescription(tag.content)
            .addFields(
                { name: "Name", value: tag.name, inline: true },
                { name: "Author", value: tagAuthor ? `${tagAuthor.tag} [\`${tagAuthor.id}\`]` : `\`Unknown User#0000 [\`${tag.author}\`]`, inline: true },
                { name: "Total Uses", value: tag.uses.toLocaleString(), inline: false },
                { name: "Created At", value: `<t:${Math.floor(tag.createdAt / 1000)}:F>`, inline: true },

            )
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }

}

module.exports = TagInfo;
