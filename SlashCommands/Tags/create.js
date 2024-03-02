const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class CreateTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "create",
            description: "Create a new tag",
            permissions: ["ManageMessages"],
            subcommand: true,
            options: [
                {
                    name: "name",
                    description: "The name of tag which should be created",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "content",
                    description: "The content of the tag",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        const tagname = interaction.options.getString("name");
        const content = interaction.options.getString("content");

        if (!tagname) return interaction.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (await this.client.database.tags.has(`${tagname.toLowerCase()}_${interaction.guild.id}`)) return interaction.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} already exists!`, true)] });
        if (this.client.commands.has(tagname.toLowerCase())) return interaction.reply({ embeds: [createEmbed("error", `Tag name ${tagname.toLowerCase()} is not available!`, true)] });
        if (!content) return interaction.reply({ embeds: [createEmbed("warn", "Please include tag content!")] });

        const struct = {
            name: tagname.toLowerCase(),
            content: content,
            author: interaction.user.id,
            createdAt: Date.now(),
            uses: 0,
        };

        await this.client.database.tags.set(`${struct.name}_${interaction.guild.id}`, struct);

        return interaction.reply(`✅ | Created tag ${struct.name}!`);
    }

}

module.exports = CreateTag;
