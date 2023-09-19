const Command = require("../../Base/Command.js");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");
const YouTube = require("youtube-sr").default;

class YouTubeSearch extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "youtube-search",
            description: "Search YouTube",
            options: [
                {
                    name: "query",
                    description: "Query to search youtube",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        const query = interaction.options.getString("query");

        const res = await YouTube.searchOne(query, "video", true).catch(() => {});
        if (!res) return interaction.reply({ embeds: [createEmbed("error", "No result found!", true)] });

        const embed = createEmbed("info")
            .setTitle("YouTube Search")
            .setImage(res.thumbnail.displayThumbnailURL("ultrares"))
            .addFields(
                { name: "Title", value: `[${res.title}](${res.url})` },
                { name: "Author", value: `[${res.channel.name}](${res.channel.url})` },
                { name: "Views", value: res.views.toLocaleString() },
                { name: "Duration", value: res.durationFormatted },
            )
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }

}

module.exports = YouTubeSearch;
