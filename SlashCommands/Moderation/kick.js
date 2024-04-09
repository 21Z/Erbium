const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Kick extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "kick",
            description: "Kick a user from the server",
            botPerms: ["KickMembers"],
            permissions: ["KickMembers"],
            options: [
                {
                    name: "user",
                    description: "The user to kick",
                    required: true,
                    type: ApplicationCommandOptionType.User,
                },
                {
                    name: "reason",
                    description: "The reason for kick",
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
        const reason = intialreason ? intialreason + ", " + moderator : "Kicked " + moderator;
        const embedreason = intialreason || "None";
        if (!target) return interaction.editReply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to kick!")] });

        if (target.id === interaction.user.id) return interaction.editReply({ embeds: [createEmbed("error", "You can not kick yourself!", true)] });
        if (target.id === interaction.guild.ownerId) return interaction.editReply({ embeds: [createEmbed("error", "You can not kick the server owner!", true)] });
        if (target.roles.highest.position > interaction.member.roles.highest.position) {
            return interaction.editReply({ embeds: [createEmbed("error", "You cannot kick someone with a higher role than yours!", true)] });
        }
        if (!target.kickable) return interaction.editReply({ embeds: [createEmbed("error", "I cannot kick this user!", true)] });

        const embed = createEmbed("error")
            .setTitle("Action: Kick")
            .setDescription(`Kicked ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)\nReason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Kicked by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });

        await interaction.guild.members.kick(target.id, { reason: reason }).then(() => {
            interaction.editReply({ embeds: [embed] });
        });
    }

}

module.exports = Kick;
