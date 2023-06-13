const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");
const YouTube = require("youtube-sr").default;

class YouTubeSearch extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "youtubesearch",
            aliases: ["ytsearch", "yt"],
            description: "YouTube Search",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const query = args.join(" ");
        if (!query) return message.reply({ embeds: [createEmbed("error", "Please include a search query!", true)] });

        const res = await YouTube.searchOne(query, "video", true).catch(() => {});
        if (!res) return message.reply({ embeds: [createEmbed("error", "No result found!", true)] });

        const embed = createEmbed("info")
            .setTitle("YouTube Search")
            .setImage(res.thumbnail.displayThumbnailURL("ultrares"))
            .addFields(
                { name: "Title", value: `[${res.title}](${res.url})` },
                { name: "Author", value: `[${res.channel.name}](${res.channel.url})` },
                { name: "Views", value: res.views.toLocaleString() },
                { name: "Duration", value: res.durationFormatted },
            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }

}

module.exports = YouTubeSearch;
