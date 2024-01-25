const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Triggered extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "triggered",
            aliases: ["trigger"],
            description: "TRIGGERED",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.triggered(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "triggered.gif" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://triggered.gif")], files: [file] });
    }

}

module.exports = Triggered;
