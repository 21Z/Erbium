const Command = require('../../Base/Command');

class Tags extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'tags',
            aliases: ['listtag', 'alltag'],
            description: 'Shows all tags',
            cooldown: 6000,
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || await this.client.resolveUser(args.join(' '));
        const data = (await this.client.database.tags.all()).filter(x => x.id.endsWith(`_${message.guild.id}`));
        const filtered = user ? data.filter(d => d.value.author === user.id) : data;

        if (!filtered.length) return message.reply('❌ | No tags found!');

        const tagList = filtered.sort((a, b) => b.value.uses - a.value.uses).map((m, i) => `${i + 1}. ${m.value.name} :: [${m.value.uses.toLocaleString()} uses]`).join('\n');

        return message.reply(`\`\`\`asciidoc\n= Tags =\n${tagList}\`\`\``);
    }

}

module.exports = Tags;