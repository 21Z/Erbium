/* eslint-disable no-unused-vars */
const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");
const { inspect } = require("util");

class Eval extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "eval",
            description: "Evaluates Arbitrary JavaScript Code",
            ownerOnly: true,
            options: [
                {
                    name: "code",
                    description: "The code to run",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "silent",
                    description: "Weather the code should be run silently (no output)",
                    type: ApplicationCommandOptionType.Boolean,
                },
                {
                    name: "async",
                    description: "Weather the code should be run in an asynchronous function",
                    type: ApplicationCommandOptionType.Boolean,
                },
            ],
        });
    }

    async run(interaction) {
        const Discord = require("discord.js");
        const client = this.client;
        const int = interaction;

        const code = interaction.options.getString("code");
        const embed = createEmbed("info").addFields([{ name: "Input", value: code.length > 1024 ? `${await this.client.utils.hastebin(code)}.js` : `\`\`\`js\n${code}\n\`\`\`` }]);

        try {
            if (!code) {
                return interaction.reply({
                    embeds: [createEmbed("error", "No code was provided.", true)],
                });
            }
            await interaction.deferReply();
            const start = Date.now();
            const isAsync = interaction.options.getBoolean("async");
            const isSilent = interaction.options.getBoolean("silent");
            const evaled = inspect(await eval(isAsync ? `(async () => {\n${code}\n})()` : code), {
                depth: 0,
            });

            const end = Date.now() - start;
            if (isSilent) return interaction.editReply({ content: `Success! Took ${end}ms`, ephemeral: true });

            const cleaned = this.client.utils.cleanText(evaled);
            const output = cleaned.length > 1024 ? `${await this.client.utils.hastebin(cleaned)}.js` : `\`\`\`js\n${cleaned}\n\`\`\``;
            embed.addFields([{ name: "Output", value: output }]);
            interaction.editReply({ content: `Success! Took ${end}ms`, embeds: [embed] });
        } catch (e) {
            const cleaned = this.client.utils.cleanText(String(e));
            const error = `\`\`\`js\n${cleaned}\n\`\`\``;
            if (error.length > 1024) {
                const hastebin = await this.client.utils.hastebin(error);
                embed.setColor("Red").addFields({ name: "Error", value: `${hastebin}.js` });
            } else { embed.setColor("Red").addFields({ name: "Error", value: error }); }
            interaction.editReply({ embeds: [embed] });
        }
    }

}

module.exports = Eval;
