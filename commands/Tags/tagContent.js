const Command = require("../../Base/Command.js");
const { escapeMarkdown } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class TagContent extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "tagcontent",
            aliases: ["tag-content", "tag-source", "tagsource", "tagsrc"],
            description: "Tag source",
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname.toLowerCase()) return message.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (!await this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        const data = await this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`);

        return message.reply(this.clean(escapeMarkdown(data.content)), { split: true, disableMentions: "everyone" });
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
