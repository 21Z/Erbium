const Command = require("../../Base/Command");

class Loop extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "loop",
            aliases: ["r", "repeat"],
            description: "Set loop mode",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.reply("❌ | I am not playing anything?");

        let loopType = args[0];
        if (!loopType) loopType = "queue";

        const valid = ["track", "queue"];
        if (!valid.includes(loopType)) return message.reply(`❌ | Loop type must be one of ${valid.map(m => `\`${m}\``).join(", ")}!`);

        const status = loopType === "track" ? queue.player.setRepeatMode(message, !Boolean(queue.repeatMode)) : queue.player.setLoopMode(message, !Boolean(queue.loopMode));

        if (status) {
            return void message.reply(`${loopType === "track" ? "🔂" : "🔁"} | Loop mode for **${loopType}** enabled!`);
        }

        return void message.reply(`➡ | Loop mode for **${loopType}** disabled!`);
    }

}

module.exports = Loop;