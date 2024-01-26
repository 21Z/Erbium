const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Color extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "color",
            aliases: ["colour"],
            description: "HTML5 Colour",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const color = args[0].replace(/^(#|0x)?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "#$2") ?? "#FFFFFF";

        const img = canvacord.color(color, false, 160, 200);
        const file = new AttachmentBuilder(img, { name: "color.png" });

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://color.png")], files: [file] });
    }

}

module.exports = Color;
