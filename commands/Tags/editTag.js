const Command = require("../../Base/Command");

class EditTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "edittag",
            aliases: ["tagedit", "updatetag"],
            description: "Edit a tag",
            permissions: ["MANAGE_MESSAGES"]
        });
    }

    async run(message, args) {
        const [tagname, ...rawcontent] = args;
        const content = rawcontent.join(" ");

        if (!tagname.toLowerCase()) return message.reply("❌ | Please include a tag name!");

        if (!this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply(`❌ | Tag ${tagname.toLowerCase()} is not available!`);

        if (!content) return message.reply("❌ | Please include new tag content!");

        const struct = {
            ...this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`),
            content: content
        };

        this.client.database.tags.set(`${tagname.toLowerCase()}_${message.guild.id}`, struct);

        return message.reply(`✅ | Modified tag ${struct.name}!`);
    }

}

module.exports = EditTag;