const Command = require('../../Base/Command');
const { EmbedBuilder } = require('discord.js');

class TagInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'taginfo',
            aliases: ['taginfo', 'abouttag', 'tag'],
            description: 'Shows tag info',
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname) return message.reply('❌ | Please include a tag name!');

        if (!this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply(`❌ | Tag ${tagname.toLowerCase()} is not available!`);

        const tag = await this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`);
        const tagAuthor = this.client.resolveUser(tag.author) || await this.client.users.fetch(tag.author).catch();

        const embedColor = this.client.config.EMBED_COLOR;
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Tag Info', iconURL: message.guild.iconURL() })
            .setTitle('Content')
            .setDescription(tag.content)
            .addFields(
                { name: 'Name', value: tag.name, inline: true },
                { name: 'Author', value: tagAuthor ? `${tagAuthor.tag} [\`${tagAuthor.id}\`]` : `\`Unknown User#0000 [\`${tag.author}\`]`, inline: true },
                { name: 'Total Uses', value: tag.uses.toLocaleString(), inline: false },
                { name: 'Created At', value: `<t:${Math.floor(tag.createdAt / 1000)}:F>`, inline: true },

            )
            .setColor(embedColor)
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();


        return message.reply({ embeds: [embed] });
    }

}

module.exports = TagInfo;
