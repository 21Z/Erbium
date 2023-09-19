const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Avatar extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "avatar",
            description: "Shows avatar of the specified user.",
            options: [
                {
                    name: "user",
                    description: "The user who's avatar should be shown",
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const user = interaction.options.getUser("user") ?? interaction.user;
        const embed = createEmbed("info")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setTitle("Avatar")
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }

}

module.exports = Avatar;
