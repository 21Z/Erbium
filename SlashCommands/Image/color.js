const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Color extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "color",
            description: "HTML5 Colour",
            subcommand: true,
            options: [
                {
                    name: "color",
                    description: "HEX Color",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        const color = interaction.options.getString("color").replace(/^(#|0x)?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "#$2");

        const img = Canvacord.color(color, false, 160, 200);
        const file = new AttachmentBuilder(img, { name: "color.png" });

        return interaction.reply({ embeds: [createEmbed("info").setImage("attachment://color.png")], files: [file] });
    }

}

module.exports = Color;
