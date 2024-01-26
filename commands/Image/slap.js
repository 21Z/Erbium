const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Slap extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "slap",
            aliases: ["batslap"],
            description: "Slap someone",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;
        if (user === message.author) return message.reply({ embeds: [createEmbed("error", "Tag someone!", true)] });

        const m = await message.reply("⏱ | Please wait...");
        const img = await canvacord.slap(message.author.displayAvatarURL({ extension: "png", size: 2048 }), user.displayAvatarURL({ extension: "png", size: 2048 }));
        const file = new AttachmentBuilder(img, { name: "slap.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://slap.png")], files: [file] });
    }

}

module.exports = Slap;
