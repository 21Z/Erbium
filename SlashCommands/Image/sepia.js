const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Sepia extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "sepia",
            description: "Sepia wash",
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
        const img = await canvacord.sepia(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "sepia.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://sepia.png")], files: [file] });
    }

}

module.exports = Sepia;
