const Event = require("../Base/Event.js");
const { Events } = require("discord.js");

class InteractionCreate extends Event {

    constructor(client) {
        super(client);

        this.config({
            name: Events.InteractionCreate,
        });
    }

    async run(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = this.client.SlashCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            this.client.logger.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }

    }
}

module.exports = InteractionCreate;
