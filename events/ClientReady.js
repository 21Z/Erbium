const Event = require("../Base/Event.js");
const { ActivityType, EmbedBuilder, escapeMarkdown } = require("discord.js");

class Ready extends Event {

    constructor(client) {
        super(client);
        this.config({ once: true });
    }

    async run() {
        this.client.logger.success("Bot is online!");

        this.client.user.setActivity("on Youtube", {
            type: ActivityType.Streaming,
            url: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
        });
        if (await this.client.database.tags.get("todo-channel")) {
            setInterval(async () => {
                const embed = new EmbedBuilder()
                    .setTitle("Bot Stats")
                    .setDescription(`*Last updated <t:${Math.round(Date.now() / 1000)}:R>*`)
                    .addFields(
                        { name: "Uptime", value: this.client.utils.formatDuration(this.client.uptime) },
                        { name: "To Do (Upcoming):", value: escapeMarkdown(await this.client.database.tags.get("todo")) },
                    )
                    .setFooter({ text: "This embed is updated every 20 seconds" })
                    .setColor(0x4d5e94);
                this.client.channels.fetch(await this.client.database.tags.get("todo-channel")).then(async (c) => {
                    c.messages.fetch(await this.client.database.tags.get("todo-message")).then((m) => {
                        m.edit({ embeds: [embed] });
                    });
                });
            }, 60000);
        }
        process.on("unhandledRejection", error => {
            if (error.toString().includes("DiscordAPIError")) {
                return this.client.logger.error(error);
            } else {
                this.client.logger.error(error);
                process.exit(1);
            }
        });
    }

}

module.exports = Ready;
