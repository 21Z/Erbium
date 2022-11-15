const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Spank extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "spank",
            aliases: [],
            description: "Spank someone"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.spank(message.author.displayAvatarURL({ format: "png", size: 2048 }), user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "spank.png"));
    }

}

module.exports = Spank;