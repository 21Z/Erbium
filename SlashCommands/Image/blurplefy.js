const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
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
        const img = await Canvacord.colorfy(user.displayAvatarURL({ extension: "png", size: 2048 }), "#4d5e94");
        const attachment = new AttachmentBuilder(img, { name: "blurplefy.png" });

        return interaction.reply({ embeds: [createEmbed("info").setImage("attachment://blurplefy.png")], files: [attachment] });
    }

}

module.exports = Blurpify;
