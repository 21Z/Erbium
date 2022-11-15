const Command = require("../../Base/Command.js");
const { MessageAttachment } = require("discord.js");
const { Canvas: Canvacord } = require("canvacord");

class Bed extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "bed",
            aliases: [],
            description: "There's someone under my bed!?"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.bed(message.author.displayAvatarURL({ format: "png", size: 2048 }), user.displayAvatarURL({ format: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply(new MessageAttachment(img, "bed.png"));
    }

}

module.exports = Bed;