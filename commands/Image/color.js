const Command = require("../../Base/Command");
const { Canvas: Canvacord } = require("canvacord");
const { MessageAttachment } = require("discord.js");

class Color extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "color",
            aliases: ["colour"],
            description: "HTML5 Colour"
        });
    }

    run(message, args) {
        const color = args[0] ?? "#FFFFFF";

        const image = Canvacord.color(color, false, 2048, 2048);
        const attachment = new MessageAttachment(image, "color.png");

        return message.channel.send(attachment);
    }

}

module.exports = Color;