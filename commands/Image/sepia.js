import Command from "../../Base/Command.js";
import { MessageAttachment } from "discord.js";
import { Canvas as Canvacord } from "canvacord";

class Sepia extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "sepia",
            aliases: [],
            description: "Sepia wash"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.sepia(user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "sepia.png"));
    }

}

export default Sepia;