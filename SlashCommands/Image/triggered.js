const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Triggered extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "triggered",
            description: "TRIGGERED",
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
        const img = await canvacord.triggered(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "triggered.gif" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://triggered.gif")], files: [file] });
    }

}

module.exports = Triggered;
