const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Invite extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "invite",
            aliases: ["inv"],
            description: "Bot invite link",
            botPerms: ["EmbedLinks"],
            cooldown: 5000,
        });
    }

    async run(message) {
        const embed = createEmbed("info")
            .setTitle("Bot Invite")
            .setDescription(`**[Click Here](${this.client.generateInvite({ scopes: ["bot", "applications.commands"], permissions: "277028916423" }) })** to invite me`)
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }

}

module.exports = Invite;
