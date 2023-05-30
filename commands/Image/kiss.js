const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");
const { Canvas: Canvacord } = require("canvacord");

class Kiss extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "kiss",
            description: "Kiss your partner",
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;
        if (user === message.author) return message.reply({ embeds: [createEmbed("error", "Tag someone!", true)] });

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.kiss(message.author.displayAvatarURL({ extension: "png", size: 2048 }), user.displayAvatarURL({ extension: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply({ files: [img] });
    }

}

module.exports = Kiss;
