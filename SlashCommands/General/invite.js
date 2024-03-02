const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Invite extends Command {

    constructor() {
        super();

        this.config({
            name: "invite",
            description: "Bot invite link",
        });
    }

    async run(interaction) {
        const embed = createEmbed("info")
            .setTitle("Bot Invite")
            .setDescription(`**[Click Here](${this.client.generateInvite({ scopes: ["bot", "applications.commands"], permissions: "277028916423" }) })** to invite me`)
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }

}

module.exports = Invite;
