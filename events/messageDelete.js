/* eslint-disable no-var */
const { AuditLogEvent, PermissionsBitField, WebhookClient } = require('discord.js');
const createEmbed = require('../utils/createEmbed.js');
const config = require('../config.js');

class MessageDelete extends Event {

    constructor(client) {
        super(client);
    }
    async run(message) {

        if (!message.guild) return;
        if (message.guild.id !== config.GUILD_ID) return;
        if (!process.env.WEBHOOK_URL) return;
        if (message.author.bot || message.system) return;
        if (message.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) {
            const fetchedLogs = await message.guild.fetchAuditLogs({
                type: AuditLogEvent.MessageDelete,
                limit: 1,
            });
            var deletionLog = fetchedLogs.entries.first();
            const { executor, target } = deletionLog;
            if (target.id === message.author.id) {
                var deletemsg = `📕 [Message](${message.url}) sent by ${message.author} [\`${message.author.tag}\`] was **Deleted** by \`${executor.tag}\` [${executor}] in ${message.channel}.`;
            }
            else {
                deletemsg = `📕 [Message](${message.url}) sent by ${message.author} [\`${message.author.tag}\`] was **Deleted** in ${message.channel}.`;
            }
        }
        else {
            deletemsg = `📕 [Message](${message.url}) sent by ${message.author} [\`${message.author.tag}\`] was **Deleted** in ${message.channel}. `;
        }
        if (!deletionLog) deletemsg = `📕 [Message](${message.url}) sent by ${message.author} [\`${message.author.tag}\`] was **Deleted** in ${message.channel}.`;

        const Log = createEmbed('info')
            .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            .setDescription(deletemsg.slice(0, 4096))
            .addFields({ name: 'Deleted Message: ', value: `${message.content ? message.content : 'None'}` })
            .setTimestamp()
            .setFooter({ text: `User ID: ${message.author.id}` });
        if (message.attachments.size >= 1) {
            Log.addFields({ name: 'Attachments: ', value: `${message.attachments.map(a => a.url)}`, inline: true });
        }

        new WebhookClient({ url: process.env.WEBHOOK_URL }).send({ embeds: [Log] }).catch((err) => { console.log(err); });
    }
}

module.exports = MessageDelete;