const Command = require("../../Base/Command.js");
const { canvacord } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Colorfy extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "colorfy",
            aliases: ["colourfy"],
            description: "Colorfy image!",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        let color = args[1] ?? args[0];
        if (!message.mentions.users.first() && !await this.client.resolveUser(args[0])) color = args[0];
        const user = message.mentions.users.first() || await this.client.resolveUser(args[0]) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await canvacord.colorfy(user.displayAvatarURL({ extension: "png", size: 2048 }), `${color}`);
        const file = new AttachmentBuilder(img, { name: "colorfy.png" });
        await m.delete().catch(() => {});

        return message.reply({ embeds: [createEmbed("info").setImage("attachment://colorfy.png")], files: [file] });
    }

}

module.exports = Colorfy;
