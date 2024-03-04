const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Bed extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "bed",
            description: "There's someone under my bed!?",
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
        const img = await canvacord.bed(interaction.user.displayAvatarURL({ extension: "png", size: 2048 }), user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "bed.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://bed.png")], files: [file] });
    }

}

module.exports = Bed;
