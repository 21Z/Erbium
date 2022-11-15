const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Beautiful extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "beautiful",
            aliases: [],
            description: "Oh this? This is beautiful!"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.beautiful(user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "beautiful.png"));
    }

}

module.exports = Beautiful;