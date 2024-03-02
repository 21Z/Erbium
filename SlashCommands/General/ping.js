const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Ping extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "ping",
            description: "Bot ping",
        });
    }

    async run(interaction) {
        const before = Date.now();
        await interaction.deferReply();
        const latency = Date.now() - before;
        const wsLatency = this.client.ws.ping.toFixed(0);

        const embed = createEmbed("info")
            .setAuthor({
                name: "🏓 PONG",
                iconURL: interaction.user.displayAvatarURL(),
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
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        interaction.editReply({ embeds: [embed], content: "\u200b" });
    }

}

module.exports = Ping;
