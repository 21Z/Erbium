const Command = require('../../Base/Command.js');
const { MessageEmbed } = require('discord.js');

class Help extends Command {

	constructor(client) {
		super(client);

		this.config({
			name: 'help',
			aliases: ['h', 'command', 'cmd', 'commands', 'menu'],
			description: 'Shows available commands.',
		});
	}

	async run(message, args) {
		const embedColor = this.client.config.EMBED_COLOR;
		const category = [...new Set(this.client.commands.commands.map(m => m.help.category))];
		const [query] = args;

		if (!query) {
			const embed = new MessageEmbed()
				.setTitle(`Commands - Total: ${this.client.commands.size}`)
				.setColor(embedColor)
				.setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
				.setTimestamp();
			let x = 1;

			for (const i of category) {
				// eslint-disable-next-line no-shadow
				const cmd = this.client.commands.commands.filter(cmd => cmd.help.category === i).map(m => `\`${m.help.name}\``);
				embed.addFields({ name: `${x}. ${i}`, value: cmd.join(', ') });
				x++;
			}

			return message.reply({ embeds: [embed] });
		}

		if (category.some(q => q === query)) {
			const ctg = category.find(q => q.toLowerCase() === query.toLowerCase());
			console.log(ctg);
			const embed = new MessageEmbed()
				.setTitle('Commands')
				.setColor(embedColor)
				.addFields({ name: 'Category', value: ctg, inline: true })
				.setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
				.setTimestamp();

			// eslint-disable-next-line no-shadow
			const cmd = this.client.commands.commands.filter(cmd => cmd.help.category === ctg).map(m => `\`${m.help.name}\``);
			embed.setDescription(cmd.join(', '));

			return message.reply({ embeds: [embed] });
		}

		const command = this.client.commands.resolve(query.toLowerCase());
		if (!command) return message.reply('❌ | Command not found!');

		const embed = new MessageEmbed()
			.setTitle('Command Info')
			.setColor(embedColor)
			.addFields(
				{ name: 'Name', value: command.help.name, inline: true },
				{ name: 'Aliases', value: !command.help.aliases.length ? 'None' : command.help.aliases.map(m => `\`${m}\``).join(', '), inline: true },
				{ name: 'Category', value: command.help.category, inline: true },
				{ name: 'Description', value: command.help.description, inline: true },
				{ name: 'Cooldown', value: `${Math.floor(command.help.cooldown ? command.help.cooldown / 1000 : 1)} Second(s)`, inline: true },
				{ name: 'Owner Only', value: command.help.ownerOnly ? 'Yes' : 'No', inline: true },
				{ name: 'Permissions', value: command.help.permissions.length ? command.help.permissions.map(m => `\`${m}\``).join(', ') : 'None' },
			)
			.setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
			.setTimestamp();

		return message.reply({ embeds: [embed] });
	}

}

module.exports = Help;