const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Blurpify extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "blurplefy",
            description: "Blurpify image!",
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
        const img = await canvacord.colorfy(user.displayAvatarURL({ extension: "png", size: 2048 }), "#4d5e94");
        const file = new AttachmentBuilder(img, { name: "blurplefy.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://blurplefy.png")], files: [file] });
    }

}

module.exports = Blurpify;
