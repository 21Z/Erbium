const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Purge extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "purge",
            aliases: ["bulkdelete", "bulkdel", "sweep", "clear"],
            description: "Purge messages in the current channel!",
            botPerms: ["ManageMessages", "EmbedLinks"],
            permissions: ["ManageMessages"],
        });
    }

    async run(message, args) {
        const query = args[0];
        if (parseInt(query) === 1) return message.reply({ embeds: [createEmbed("warn", "If you want to purge one message, please do it manually.")] });
        if (!query || isNaN(query) || parseInt(query) < 1) {
            return message.reply({ embeds: [createEmbed("warn", "Please specify a valid amount of messages to delete!")] });
        }
        await message.delete();

        const amount = parseInt(query);
        const messages = await message.channel.messages.fetch({ limit: amount });
        await message.channel.bulkDelete(messages, true).catch(() => {}).then(
            message.channel.send({ embeds: [createEmbed("success").setTitle(`:broom: Successfully deleted ${amount} messages!`)] }).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(() => {});
                }, 2000);
            }),
        );
    }

}

module.exports = Purge;
