const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");

class Colorfy extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "colorfy",
            aliases: ["colourfy"],
            description: "Colorfy image!",
        });
    }

    async run(message, args) {
        let color = args[1] ?? args[0];
        if (!message.mentions.users.first() && !await this.client.resolveUser(args[0])) color = args[0];
        const user = message.mentions.users.first() || await this.client.resolveUser(args[0]) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.colorfy(user.displayAvatarURL({ format: "png", size: 2048 }), `${color}`);
        await m.delete().catch(() => { });

        return message.reply({ files: [img] });
    }
}

module.exports = Colorfy;
