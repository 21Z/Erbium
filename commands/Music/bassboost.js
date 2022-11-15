const Command = require("../../Base/Command");

class BassBoost extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "bassboost",
            aliases: ["bb"],
            description: "Toggles bassboost",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.reply("❌ | I am not playing anything?");

        queue.setFilters({
            bassboost: !queue.filters.bassboost,
            normalizer: !queue.filters.normalizer
        });

        message.reply(`✅ | ${queue.filters.bassboost ? "Enabled" : "Disabled"} Bassboost!`);
    }

}

module.exports = BassBoost;