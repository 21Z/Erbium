const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Uptime extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "uptime",
            aliases: ["ut"],
            description: "Bot uptime",
            botPerms: ["EmbedLinks"],
            cooldown: 5000,
        });
    }

    async run(message) {
        const embed = createEmbed("info")
            .setTitle("Bot Uptime")
            .setDescription(this.client.utils.formatDuration(this.client.uptime))
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }

}

module.exports = Uptime;
