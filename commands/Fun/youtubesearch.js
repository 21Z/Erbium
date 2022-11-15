const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");
const YouTube = require("youtube-sr").default;

class YouTubeSearch extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "youtubesearch",
            aliases: ["ytsearch", "yt"],
            description: "YouTube Search"
        });
    }

    async run(message, args) {
        const query = args.join(" ");
        if (!query) return message.reply("❌ | Please include a search query!");

        const res = await YouTube.searchOne(query, "video", true).catch(e => {});
        if (!res) return message.reply("❌ | No result found!");

        const embed = new MessageEmbed()
            .setTitle("YouTube Search")
            .setImage(res.thumbnail.displayThumbnailURL("ultrares"))
            .addField("Title", `[${res.title}](${res.url})`)
            .addField("Author", `[${res.channel.name}](${res.channel.url})`)
            .addField("Views", res.views.toLocaleString())
            .addField("Duration", res.durationFormatted)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor("RED");

        return message.reply(embed);
    }

}

module.exports = YouTubeSearch;