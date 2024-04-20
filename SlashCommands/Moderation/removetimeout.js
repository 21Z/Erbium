const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class RemoveTimeout extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "removetimeout",
            description: "Remove timeout from a user.",
            botPerms: ["ModerateMembers"],
            permissions: ["ModerateMembers"],
            options: [
                {
                    name: "user",
                    description: "The user who you want to remove timeout from",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason why you want to remove timeout from the user",
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        await interaction.deferReply();
        const target = interaction.options.getMember("user");
        const intialreason = interaction.options.getString("reason");
        const moderator = `by ${interaction.user.tag} [ID: ${interaction.user.id}]`;
        const reason = intialreason ? intialreason + ", " + moderator : "Timeout removed " + moderator;
        const embedreason = intialreason || "None";
        if (!target) return interaction.editReply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to remove timeout from!")] });

        if (!target.isCommunicationDisabled()) return interaction.editReply({ embeds: [createEmbed("error", "The user is not timed out!", true)] });
        if (target.roles.highest.position > interaction.member.roles.highest.position) {
            return interaction.editReply({ embeds: [createEmbed("error", "You cannot remove timeout from someone with a higher role than yours!", true)] });
        }
        if (!target.moderatable) return interaction.editReply({ embeds: [createEmbed("error", "I cannot remove timeout from this user!")] });

        const embed = createEmbed("error")
            .setTitle("Action: Remove Timeout")
            .setDescription(`Timeout Removed from ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)
            Reason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Timeout Removed by ${interaction.user.tag}`,
                iconURL: interaction.member.displayAvatarURL(),
            });

        await target.timeout(null, reason).then(() => {
            interaction.editReply({ embeds: [embed] });
        });
    }

}

module.exports = RemoveTimeout;
