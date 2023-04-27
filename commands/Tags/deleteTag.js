const Command = require('../../Base/Command');
const createEmbed = require('../../utils/createEmbed');

class DeleteTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'deletetag',
            aliases: ['removetag', 'rmtag'],
            description: 'Delete a tag',
            permissions: ['ManageMessages'],
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname.toLowerCase()) return message.reply({ embeds: [createEmbed('warn', 'Please include a tag name!')] });

        if (!await this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply({ embeds: [createEmbed('error', `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        await this.client.database.tags.delete(`${tagname.toLowerCase()}_${message.guild.id}`);

        return message.reply(`✅ | Removed tag ${tagname.toLowerCase()}!`);
    }

}

module.exports = DeleteTag;
