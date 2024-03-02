const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Tags extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "list",
            description: "Shows all tags",
            subcommand: true,
            options: [
                {
                    name: "user",
                    description: "The user who's tags should be shown",
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const user = interaction.options.getUser("user");
        const data = (await this.client.database.tags.all()).filter(x => x.id.endsWith(`_${interaction.guild.id}`));
        const filtered = user ? data.filter(d => d.value.author === user.id) : data;

        if (!filtered.length) return interaction.reply({ embeds: [createEmbed("error", "No tags found!", true)] });

        const tagList = filtered.sort((a, b) => b.value.uses - a.value.uses).map((m, i) => `${i + 1}. ${m.value.name} :: [${m.value.uses.toLocaleString()} uses]`).join("\n");

        return interaction.reply(`\`\`\`asciidoc\n= Tags =\n${tagList}\`\`\``);
    }

}

module.exports = Tags;
