const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Shit extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "shit",
            aliases: [],
            description: "ew"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.shit(user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "shit.png"));
    }

}

module.exports = Shit;