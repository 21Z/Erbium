const { Util, MessageEmbed } = require("discord.js");
const Command = require("../../Base/Command");

class Queue extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "queue",
            aliases: ["q"],
            description: "Shows the queue",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.reply("❌ | I am not playing anything?");

        // todo: pagination
        const tracks = queue.tracks.map((m, i) => `${i+1}. **[${Util.escapeMarkdown(m.title)}](${m.url})**${i === 0 ? " <--- Now Playing" : ""}`).slice(0, 10);

        const embed = new MessageEmbed()
            .setTitle("Queue")
            .setDescription(tracks.join("\n").substring(0, 2048))
            .setColor("RANDOM")
            .setFooter(`Total: ${queue.tracks.length}`);
        
        if (queue.playing.thumbnail) embed.setThumbnail(queue.playing.thumbnail);

        return message.reply(embed);
    }

}

module.exports = Queue;