const Command = require("../../Base/Command");
const { Util } = require("discord.js");

class TagContent extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "tagcontent",
            aliases: ["tagsource", "tagsrc"],
            description: "Tag source",
            permissions: []
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname.toLowerCase()) return message.reply("❌ | Please include a tag name!");

        if (!this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply(`❌ | Tag ${tagname.toLowerCase()} is not available!`);

        const data = this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`);

        return message.reply(this.clean(Util.escapeMarkdown(data.content)), { split: true, disableMentions: "everyone" });
    }

    clean(text) {
        const rg = (m) => new RegExp(m, "g");

        return text
            .replace(rg("<"), "<\u200b")
            .replace(rg(">"), ">\u200b")
            .replace(rg(":"), ":\u200b")
            .replace(rg("@"), "@\u200b");
    }

}

module.exports = TagContent;