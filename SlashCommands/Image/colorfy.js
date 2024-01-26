const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Colorfy extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "colorfy",
            description: "Colorfy image!",
            subcommand: true,
            options: [
                {
                    name: "color",
                    description: "Color (ex. Green)",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "user",
                    description: "The user to run the command on",
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const color = interaction.options.getString("color");
        const user = interaction.options.getUser("user") ?? interaction.user;

        await interaction.deferReply();
        const img = await canvacord.colorfy(user.displayAvatarURL({ extension: "png", size: 2048 }), `${color}`);
        const file = new AttachmentBuilder(img, { name: "colorfy.png" });

        return interaction.editReply({ embeds: [createEmbed("info").setImage("attachment://colorfy.png")], files: [file] });
    }

}

module.exports = Colorfy;
