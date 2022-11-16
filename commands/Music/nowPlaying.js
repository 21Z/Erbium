const { MessageEmbed } = require("discord.js");
const Command = require("../../Base/Command");

class NowPlaying extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "nowplaying",
            aliases: ["np"],
            description: "Shows currently playing song",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.reply("❌ | I am not playing anything?");

        const current = queue.playing;

        const embed = new MessageEmbed()
            .setTitle("Now Playing!")
            .addFields(
            { name: "Title", value: current.title },
            { name: "Author", value: current.author ?? "Unknown Author", inline: true },
            { name: "Queued by", value: current.requestedBy.tag, inline: true },
            { name: "Progress", value: this.client.player.createProgressBar(message, { timecodes: true, length: 15 }) },
            )
            .setTimestamp()
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setColor("RED");

        if (current.thumbnail) embed.setThumbnail(current.thumbnail);

        message.reply(embed);
    }

}

module.exports = NowPlaying;