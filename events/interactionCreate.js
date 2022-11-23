const Event = require('../Base/Event.js');

class InteractionCreate extends Event {

	constructor(client) {
		super(client);
	}

	async run(interaction) {
		if (!interaction.isCommand()) return;
		const command = this.client.SlashCommands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	}
}

module.exports = InteractionCreate;
