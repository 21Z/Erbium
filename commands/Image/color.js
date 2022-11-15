import Command from "../../Base/Command";
import { Canvas as Canvacord } from "canvacord";
import { MessageAttachment } from "discord.js";

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

export default Color;