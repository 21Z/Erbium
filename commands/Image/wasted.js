const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Wasted extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "wasted",
            description: "WASTED",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.wasted(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "wasted.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://wasted.png")], files: [file] });
    }

}

module.exports = Wasted;
