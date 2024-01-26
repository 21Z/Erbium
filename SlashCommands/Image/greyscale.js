const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Greyscale extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "greyscale",
            description: "Grayscale filter",
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
        const img = await canvacord.greyscale(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "greyscale.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://greyscale.png")], files: [file] });
    }

}

module.exports = Greyscale;
