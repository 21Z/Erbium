const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Ping extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "ping",
            aliases: ["pong"],
            description: "Bot ping",
            botPerms: ["EmbedLinks"],
            cooldown: 2500,
        });
    }

    async run(message) {
        const before = Date.now();
        const msg = await message.reply({ content: "🏓" });
        const latency = Date.now() - before;
        const wsLatency = this.client.ws.ping.toFixed(0);

        const embed = createEmbed("info")
            .setAuthor({
                name: "🏓 PONG",
                iconURL: message.author.displayAvatarURL(),
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
                text: `Requested by: ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            })
            .setTimestamp();

        msg.edit({ embeds: [embed], content: "\u200b" });
    }

}

module.exports = Ping;
