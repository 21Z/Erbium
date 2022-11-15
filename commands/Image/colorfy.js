const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Colorfy extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "colorfy",
            aliases: ["colourfy"],
            description: "Colorfy image!"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args[0]) || message.author;
        const color = args[1];

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.colorfy(user.displayAvatarURL({ format: "png", size: 2048 }), `${color}`);
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "color.png"));
    }

}

module.exports = Colorfy;