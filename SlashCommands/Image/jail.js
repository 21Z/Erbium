const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Jail extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "jail",
            description: "Jail someone",
            subcommand: true,
            options: [
                {
                    name: "user",
                    description: "The user to run the command on",
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const user = interaction.options.getUser("user") ?? interaction.user;

        await interaction.deferReply();
        const img = await canvacord.jail(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "jail.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://jail.png")], files: [file] });
    }

}

module.exports = Jail;
