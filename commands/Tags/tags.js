const Command = require("../../Base/Command");
const { Util } = require("discord.js");

class Tags extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "tags",
            aliases: ["listtag", "alltag"],
            description: "Shows all tags",
            permissions: []
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first() || this.client.resolveUser(args.join(" "));
        const data = this.client.database.tags.filter(x => x.ID.endsWith(`_${message.guild.id}`));
        const filtered = user ? data.filter(d => d.data.author === user.id) : data;

        if (!filtered.length) return message.reply("❌ | No tags found!");

        const tagList = filtered.sort((a, b) => b.data.uses - a.data.uses).map((m, i) => `${i + 1}. ${m.data.name} :: [${m.data.uses.toLocaleString()} uses]`).join("\n");

        return message.reply(`= Tags =\n${tagList}`, { code: "asciidoc", split: true });
    }

}

module.exports = Tags;