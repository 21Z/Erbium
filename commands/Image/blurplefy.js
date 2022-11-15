const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Blurpify extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "blurplefy",
            aliases: ["blurpify", "blurple"],
            description: "Blurpify image!"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.colorfy(user.displayAvatarURL({ format: "png", size: 2048 }), "#4d5e94");
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "blurple.png"));
    }

}

module.exports = Blurpify;