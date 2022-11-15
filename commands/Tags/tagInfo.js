const Command = require("../../Base/Command");
const { MessageEmbed } = require("discord.js");

class TagInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "taginfo",
            aliases: ["taginfo", "abouttag", "tag"],
            description: "Shows tag info",
            permissions: []
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname) return message.reply("❌ | Please include a tag name!");

        if (!this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply(`❌ | Tag ${tagname.toLowerCase()} is not available!`);

        const tag = this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`);
        const tagAuthor = this.client.resolveUser(tag.author) || await this.client.users.fetch(tag.author).catch(e => { });

        const embed = new MessageEmbed()
            .setAuthor("Tag Info", message.guild.iconURL())
            .setTitle("Content")
            .setDescription(tag.content)
            .addField("Name", tag.name, true)
            .addField("Author", tagAuthor ? `${tagAuthor.tag} [\`${tagAuthor.id}\`]` : `\`Unknown User#0000 [\`${tag.author}\`]`, true)
            .addField("\u200b", "\u200b", false)
            .addField("Total Uses", tag.uses.toLocaleString(), true)
            .addField("Created At", new Date(tag.createdAt).toUTCString(), true)
            .setColor("RANDOM")
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            

        return message.reply(embed);
    }

}

module.exports = TagInfo;