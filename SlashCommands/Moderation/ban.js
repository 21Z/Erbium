const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Ban extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "ban",
            description: "Ban a user from the server",
            botPerms: ["BanMembers", "EmbedLinks"],
            permissions: ["BanMembers"],
            options: [
                {
                    name: "user",
                    description: "The user to ban",
                    required: true,
                    type: ApplicationCommandOptionType.User,
                },
                {
                    name: "reason",
                    description: "The reason for banning the user",
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        await interaction.deferReply();
        const target = interaction.options.getUser("user");
        const moderator = `by ${interaction.user.tag}, ID: ${interaction.user.id}`;
        const embedreason = interaction.options.getString("reason") ?? "None";
        let reason = interaction.options.getString("reason") ?? "Banned " + moderator;
        if (reason === interaction.options.getString("reason")) reason = reason + ", " + moderator;
        if (!target) return interaction.editReply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to ban!")] });

        if (target.id === interaction.user.id) return interaction.editReply({ embeds: [createEmbed("error", "You can not ban yourself!", true)] });
        if (target.id === interaction.guild.ownerId) return interaction.editReply({ embeds: [createEmbed("error", "You can not ban the server owner!", true)] });
        if (interaction.guild.members.cache.has(target.id) && target.roles.highest.position > interaction.member.roles.highest.position) {
            return interaction.editReply({ embeds: [createEmbed("error", "You cannot ban someone with a higher role than yours!", true)] });
        }
        if (interaction.guild.members.cache.has(target.id) && !target.bannable) return interaction.editReply({ embeds: [createEmbed("error", "I cannot ban this user!", true)] });

        // If the user is already banned
        const bans = await interaction.guild.bans.fetch();
        if (bans.some((m) => m.user.id === target.id)) return interaction.editReply({ embeds: [createEmbed("error", `${target} is already banned!`, true)] });

        const embed = createEmbed("success")
            .setTitle("Action: Ban")
            .setDescription(`Banned ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)\nReason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Banned by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });

        await interaction.guild.bans.create(target.id, { reason: reason }).then(() => {
            interaction.reply({ embeds: [embed] });
        });
    }

}

module.exports = Ban;
