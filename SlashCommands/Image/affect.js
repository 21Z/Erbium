const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Affect extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "affect",
            description: "No, it doesn't affect my baby.",
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
        const user = await interaction.options.getUser("user") || interaction.user;

        await interaction.deferReply();
        const img = await canvacord.affect(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "affect.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://affect.png")], files: [file] });
    }

}

module.exports = Affect;
