const Event = require("../Base/Event.js");
const { WebhookClient } = require("discord.js");
const createEmbed = require("../utils/createEmbed.js");
const config = require("../config.js");

class MessageDelete extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    async run(message) {

        if (!message.guild) return;
        if (!config.GUILD_ID.includes(message.guild.id)) return;
        if (!process.env.WEBHOOK_URL) return;
        if (!process.env.WEBHOOK_URL.match("https://(canary\\.|ptb\\.|)discord(app)*\\.com/api/webhooks/\\d{18,19}/(\\w|-|_)*(/?)")) throw new Error("The provided webhook URL is not valid.");
        if (message.author.bot || message.system) return;

        const deletemsg = `📕 [Message](${message.url}) sent by ${message.author} [\`${message.author.tag}\`] was **Deleted** in ${message.channel}.`;
        const Log = createEmbed("error")
            .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            .setDescription(deletemsg.slice(0, 4096))
            .addFields({ name: "Deleted Message: ", value: `${message.content ? message.content : "None"}` })
            .setTimestamp()
            .setFooter({ text: `User ID: ${message.author.id}` });
        if (message.attachments.size >= 1) {
            Log.addFields({ name: `Attachments: ${message.attachments.size}`, inline: true })
                .setImage(`${message.attachments.first().url}`);
        }

        new WebhookClient({ url: process.env.WEBHOOK_URL }).send({ embeds: [Log] });
    }

}

module.exports = MessageDelete;
