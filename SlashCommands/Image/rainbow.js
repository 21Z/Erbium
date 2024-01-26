const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Rainbow extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "rainbow",
            description: "Rainbow overlay",
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
        const img = await canvacord.rainbow(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "rainbow.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://rainbow.png")], files: [file] });
    }

}

module.exports = Rainbow;
