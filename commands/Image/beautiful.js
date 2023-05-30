const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");

class Beautiful extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "beautiful",
            description: "Oh this? This is beautiful!",
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(" ")) || message.author;

        const m = await message.reply("⏱ | Please wait...");
        const img = await Canvacord.beautiful(user.displayAvatarURL({ extension: "png", size: 2048 }));
        await m.delete().catch(() => { });

        return message.reply({ files: [img] });
    }

}

module.exports = Beautiful;
