const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Beautiful extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "beautiful",
            description: "Oh this? This is beautiful!",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await canvacord.beautiful(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "beautiful.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://beautiful.png")], files: [file] });
    }

}

module.exports = Beautiful;
