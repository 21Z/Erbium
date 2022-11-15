const Command = require("../../Base/Command");

class Shuffle extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "shuffle",
            aliases: [],
            description: "Shuffles the queue",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.reply("❌ | I am not playing anything?");

        if (queue.tracks.length < 7) return message.reply("❌ | You need to have more than 7 songs to shuffle!");

        queue.player.shuffle(message);

        message.reply(`🔀 | Shuffled!`);
    }

}

module.exports = Shuffle;