const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Base64 extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "base64",
            description: "Encode/Decode base64",
            options: [
                {
                    name: "encode",
                    description: "Encode string to base64",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "string",
                            description: "The string to encode",
                            required: true,
                            type: ApplicationCommandOptionType.String,
                        },
                    ],
                },
                {
                    name: "decode",
                    description: "Decode base64 string",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "string",
                            description: "The string to decode",
                            required: true,
                            type: ApplicationCommandOptionType.String,
                        },
                    ],
                },
            ],
        });
    }

    async run(interaction) {
        const string = interaction.options.getString("string");

        try {
            if (interaction.options.getSubcommand() === "encode") {
                const text = string;
                const encodedText = btoa(text);
                interaction.reply({ embeds: [createEmbed("info", `Encoded Text: \`\`\`\n${encodedText}\`\`\``)] });
            } else if (interaction.options.getSubcommand() === "decode") {
                const text = string;
                const decodedText = atob(text);
                interaction.reply({ embeds: [createEmbed("info", `Decoded Text: \`\`\`\n${decodedText}\`\`\``)] });
            }
        } catch (error) {
            interaction.reply(`\`\`\`js\n${error}\`\`\``);
        }

    }

}

module.exports = Base64;
