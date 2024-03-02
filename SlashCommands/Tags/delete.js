const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class DeleteTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "delete",
            description: "Delete a tag",
            permissions: ["ManageMessages"],
            subcommand: true,
            options: [
                {
                    name: "tag",
                    description: "The tag which should be deleted",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        const tagname = interaction.options.getString("tag");

        if (!tagname.toLowerCase()) return interaction.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (!await this.client.database.tags.has(`${tagname.toLowerCase()}_${interaction.guild.id}`)) return interaction.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        await this.client.database.tags.delete(`${tagname.toLowerCase()}_${interaction.guild.id}`);

        return interaction.reply(`✅ | Removed tag ${tagname.toLowerCase()}!`);
    }

}

module.exports = DeleteTag;
