const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Uptime extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "uptime",
            description: "Bot uptime",
        });
    }

    async run(interaction) {
        const embed = createEmbed("info")
            .setTitle("Bot Uptime")
            .setDescription(this.client.utils.formatDuration(this.client.uptime))
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }

}

module.exports = Uptime;
