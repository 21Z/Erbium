const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Blur extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "blur",
            description: "Blur image!",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.blur(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const attachment = new AttachmentBuilder(img, { name: "blur.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://blur.png")], files: [attachment] });
    }

}

module.exports = Blur;
