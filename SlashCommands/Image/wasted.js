const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Wasted extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "wasted",
            description: "WASTED",
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
        const img = await Canvacord.wasted(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "wasted.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://wasted.png")], files: [file] });
    }

}

module.exports = Wasted;
