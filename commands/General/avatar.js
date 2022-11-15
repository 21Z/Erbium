const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class Avatar extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "avatar",
            aliases: ["av", "pfp"],
            description: "Shows avatar of the specified user."
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const embed = new MessageEmbed()
            .setTitle(user.tag)
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor(0x4d5e94);

        return message.reply(embed);
    }

}

module.exports = Avatar;