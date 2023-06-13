const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Blurpify extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "blurplefy",
            aliases: ["blurpify", "blurple"],
            description: "Blurpify image!",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.colorfy(user.displayAvatarURL({ extension: "png", size: 2048 }), "#4d5e94");
        const attachment = new AttachmentBuilder(img, { name: "blurplefy.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://blurplefy.png")], files: [attachment] });
    }

}

module.exports = Blurpify;
