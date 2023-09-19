const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class UnBan extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "unban",
            description: "Unban a user from the server!",
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
        const embedreason = interaction.options.getUser("user") ?? "None";
        let reason = interaction.options.getUser("user") ?? "Unbanned " + moderator;
        if (reason === interaction.options.getUser("user")) reason = reason + ", " + moderator;
        if (!target) return interaction.reply({ embeds: [createEmbed("warn", "Please specify a valid user who you want to unban!")] });

        // If the user is not banned
        const bans = await interaction.guild.bans.fetch();
        if (!bans.some((m) => m.user.id === target.id)) return interaction.reply({ embeds: [createEmbed("error", "The user you specified is not banned!", true)] });

        const embed = createEmbed("success")
            .setTitle("Action: Unban")
            .setDescription(`Unbanned ${target} (\`${target.tag}\`)\nReason: ${embedreason}`)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Unbanned by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });

        await interaction.guild.bans.remove(target.id, { reason: reason }).then(() => {
            interaction.reply({ embeds: [embed] });
        });
    }

}

module.exports = UnBan;
