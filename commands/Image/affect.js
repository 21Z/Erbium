const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Affect extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "affect",
            description: "No, it doesn't affect my baby.",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await canvacord.affect(user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "affect.png" });

        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://affect.png")], files: [file] });
    }

}

module.exports = Affect;
