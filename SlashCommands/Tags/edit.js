const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class EditTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "edit",
            description: "Edit a tag",
            permissions: ["ManageMessages"],
            subcommand: true,
            options: [
                {
                    name: "tag",
                    description: "The tag to be edited",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "content",
                    description: "The new value for the tag",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        const tagname = interaction.options.getString("tag");
        const content = interaction.options.getString("content");

        if (!tagname.toLowerCase()) return interaction.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (!await this.client.database.tags.has(`${tagname.toLowerCase()}_${interaction.guild.id}`)) return interaction.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        if (!content) return interaction.reply({ embeds: [createEmbed("warn", "Please include new tag content!")] });

        const struct = {
            ...await this.client.database.tags.get(`${tagname.toLowerCase()}_${interaction.guild.id}`),
            content: content,
        };

        await this.client.database.tags.set(`${tagname.toLowerCase()}_${interaction.guild.id}`, struct);

        return interaction.reply(`Modified tag ${struct.name}!`);
    }

}

module.exports = EditTag;
