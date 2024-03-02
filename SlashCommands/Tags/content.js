const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType, escapeMarkdown } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class TagContent extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "content",
            description: "Tag source",
            subcommand: true,
            options: [
                {
                    name: "tag",
                    description: "The tag whom's content should be shown",
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

        const data = await this.client.database.tags.get(`${tagname.toLowerCase()}_${interaction.guild.id}`);

        return interaction.reply(this.clean(escapeMarkdown(data.content)), { disableMentions: "everyone" });
    }

    clean(text) {
        const rg = (m) => new RegExp(m, "g");

        return text
            .replace(rg("<"), "<\u200b")
            .replace(rg(">"), ">\u200b")
            .replace(rg(":"), ":\u200b")
            .replace(rg("@"), "@\u200b");
    }

}

module.exports = TagContent;
