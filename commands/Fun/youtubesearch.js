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
            .addFields(
                { name: "Title", value: `[${res.title}](${res.url})`},
                { name: "Author", value: `[${res.channel.name}](${res.channel.url})`},
                { name: "Views", value: res.views.toLocaleString()},
                { name: "Duration", value: res.durationFormatted},
            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()
            .setColor("RED");

        return message.reply({ embeds: [embed] });
    }

}

module.exports = YouTubeSearch;