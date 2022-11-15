const Command = require("../../Base/Command");

class Nightcore extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "nightcore",
            aliases: ["nc"],
            description: "Toggles Nightcore",
            permissions: []
        });
    }

    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("❌ | You are not in a voice channel!");
        if (message.guild.me.voice.channel && message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply("❌ | You are not in my voice channel!");

        const queue = this.client.player.getQueue(message);
        if (!queue) return message.reply("❌ | I am not playing anything?");

        queue.setFilters({
            nightcore: !queue.filters.nightcore,
        });

        message.reply(`✅ | ${queue.filters.nightcore ? "Enabled" : "Disabled"} Nightcore!`);
    }

}

module.exports = Nightcore;