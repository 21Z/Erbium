const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	async execute(interaction) {

		const before = Date.now();
		await interaction.reply({ content: '🏓' });
		const latency = Date.now() - before;
		const wsLatency = interaction.client.ws.ping.toFixed(0);

		const embed = new MessageEmbed()
			.setAuthor({
				name: '🏓 PONG',
				iconURL: interaction.client.user.displayAvatarURL(),
			})
			.addFields(
				{
					name: '📶 **|** API',
					value: `**\`${latency}\`** ms`,
					inline: true,
				},
				{
					name: '🌐 **|** WebSocket',
					value: `**\`${wsLatency}\`** ms`,
					inline: true,
				},
			)
			.setFooter({
				text: `Requested by: ${interaction.member.tag}`,
				iconURL: interaction.member.displayAvatarURL(),
			})
			.setTimestamp()
			.setColor(0x4d5e94);

		interaction.editReply({ content: '\u200b', embeds: [embed] });
	},
};