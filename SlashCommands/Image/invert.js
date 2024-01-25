const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Invert extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "invert",
            description: "Invert image",
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
        const img = await Canvacord.invert(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "invert.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://invert.png")], files: [file] });
    }

}

module.exports = Invert;
