const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class Ping extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "ping",
            aliases: ["pong"],
            description: "Bot ping"
        });
    }

    async run(message) {
        const m = await message.reply("🔃 Pinging...");

        const embed = new MessageEmbed()
            .addField("WebSocket Latency", `${Math.round(this.client.ws.ping)}ms`)
            .addField("HTTP Latency", `${m.createdTimestamp - message.createdTimestamp}ms`)
            .setColor(0x4d5e94)
            .setTimestamp()
            .setTitle("Pong!");
        
        m.edit({ embed, content: "" });
    }

}

module.exports = Ping;