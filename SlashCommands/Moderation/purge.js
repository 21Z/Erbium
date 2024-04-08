const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Purge extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "purge",
            description: "Purge messages in the current channel!",
            botPerms: ["ManageMessages"],
            permissions: ["ManageMessages"],
            options: [
                {
                    name: "amount",
                    description: "The amount of messages to delete",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });
    }

    async run(interaction) {
        const query = interaction.options.getString("amount");
        if (!query || isNaN(query) || parseInt(query) < 1) {
            return interaction.reply({ embeds: [createEmbed("warn", "Please specify a valid amount of messages to delete!")], ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });
        const amount = parseInt(query);
        const messages = await interaction.channel.messages.fetch({ limit: amount });
        await interaction.channel.bulkDelete(messages, true).catch(() => {}).then(() => {
            interaction.editReply({ embeds: [createEmbed("success").setTitle(`:broom: Successfully deleted ${amount} messages!`)] });
        });
    }

}

module.exports = Purge;
