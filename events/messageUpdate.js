const { WebhookClient } = require("discord.js");
const createEmbed = require("../utils/createEmbed.js");
const config = require("../config.js");

class MessageUpdate extends Event {

    constructor(client) {
        super(client);
    }
    async run(oldMessage, newMessage) {

        if (!oldMessage.guild) return;
        if (!config.GUILD_ID.includes(oldMessage.guild.id)) return;
        if (!process.env.WEBHOOK_URL) return;
        if (oldMessage.content === newMessage.content) return;
        if (oldMessage.author.bot || oldMessage.system) return;

        const Original = oldMessage.content.slice(0, 1950) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, 1950) + (newMessage.content.length > 1950 ? " ..." : "");

        const editmsg = `📘 [Message](${newMessage.url}) sent by ${newMessage.author} [\`${newMessage.author.tag}\`] was **Edited** in ${newMessage.channel}.`;

        const Log = createEmbed("info")
            .setAuthor({ name: `${newMessage.author.tag}`, iconURL: `${newMessage.author.displayAvatarURL()}` })
            .setDescription(editmsg.slice(0, 4096))
            .addFields(
                { name: "Original: ", value: `${Original}` },
                { name: "Edited: ", value: `${Edited}` },
            )
            .setTimestamp()
            .setFooter({ text: `User ID: ${newMessage.author.id}` });

        new WebhookClient({ url: process.env.WEBHOOK_URL }).send({ embeds: [Log] }).catch((err) => { this.client.logger.error(err); });
    }
}

module.exports = MessageUpdate;
