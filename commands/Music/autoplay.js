const Command = require("../../Base/Command");

class AutoPlay extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "autoplay",
            aliases: [],
            description: "Toggle autoplay",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue || queue.paused) return message.reply("❌ | I am not playing anything?");

        const status = queue.player.setAutoPlay(message, !Boolean(queue.autoPlay));

        message.reply(`▶ | Auto play mode ${status ? "enabled" : "disabled"}!`);
    }

}

module.exports = AutoPlay;