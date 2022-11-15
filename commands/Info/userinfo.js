const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class UserInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "userinfo",
            aliases: ["ui"],
            description: "User information"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" ")) || message.author;

        const embed = new MessageEmbed()
            .setAuthor("User Information", message.guild.iconURL())
            .setThumbnail(user.displayAvatarURL({ size: 4096 }))
            .setColor("RANDOM")
            .addField("Name", user.username, true)
            .addField("Discriminator", user.discriminator, true)
            .addField("Type", user.bot ? "Bot" : "User", true)
            .addField("ID", user.id, true)
            .addField("Created At", user.createdAt.toString())
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.reply(embed);
    }
}

module.exports = UserInfo;