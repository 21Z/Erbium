const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Kiss extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "kiss",
            description: "Kiss your partner",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;
        if (user === message.author) return message.reply({ embeds: [createEmbed("error", "Tag someone!", true)] });

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.kiss(message.author.displayAvatarURL({ extension: "png", size: 2048 }), user.displayAvatarURL({ extension: "png", size: 2048 }));
        const attachment = new AttachmentBuilder(img, { name: "blur.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://kiss.png")], files: [attachment] });
    }

}

module.exports = Kiss;
