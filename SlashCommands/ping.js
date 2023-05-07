const { SlashCommandBuilder } = require("discord.js");
const createEmbed = require("../utils/createEmbed");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    async execute(interaction) {

        const before = Date.now();
        await interaction.deferReply();
        const latency = Date.now() - before;
        const wsLatency = interaction.client.ws.ping.toFixed(0);

        const embed = createEmbed("info")
            .setAuthor({
                name: "🏓 PONG",
                iconURL: interaction.client.user.displayAvatarURL(),
            })
            .addFields(
                {
                    name: "📶 **|** API",
                    value: `**\`${latency}\`** ms`,
                    inline: true,
                },
                {
                    name: "🌐 **|** WebSocket",
                    value: `**\`${wsLatency}\`** ms`,
                    inline: true,
                },
            )
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.member.displayAvatarURL(),
            })
            .setTimestamp();

        interaction.editReply({ embeds: [embed] });
    },
};
