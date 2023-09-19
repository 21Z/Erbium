const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class UserInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "userinfo",
            description: "User information",
            options: [
                {
                    name: "user",
                    description: "The user to get information about",
                    required: true,
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const user = interaction.options.getUser("user");

        const embed = createEmbed("info")
            .setAuthor({ name: "User Information", iconURL: interaction.guild.iconURL() })
            .setThumbnail(user.displayAvatarURL({ size: 4096 }))
            .addFields(
                { name: "Name", value: user.username, inline: true },
                { name: "Discriminator", value: user.discriminator, inline: true },
                { name: "Type", value: user.bot ? "Bot" : "User", inline: true },
                { name: "ID", value: user.id, inline: true },
                { name: "Created At", value: user.createdAt.toString() },
            )
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }

}

module.exports = UserInfo;
