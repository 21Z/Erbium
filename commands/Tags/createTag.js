const Command = require("../../Base/Command");

class CreateTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "createtag",
            aliases: ["addtag", "newtag"],
            description: "Creates new tag",
            permissions: ["MANAGE_MESSAGES"]
        });
    }

    async run(message, args) {
        const [tagname, ...rawcontent] = args;
        const content = rawcontent.join(" ");

        if (!tagname) return message.reply("❌ | Please include a tag name!");

        if (this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply(`❌ | Tag ${tagname.toLowerCase()} already exists!`);
        if (this.client.commands.has(tagname.toLowerCase())) return message.reply(`❌ | Tag name ${tagname.toLowerCase()} is not available!`);
        if (!content) return message.reply("❌ | Please include tag content!");

        const struct = {
            name: tagname.toLowerCase(),
            content: content,
            author: message.author.id,
            createdAt: Date.now(),
            uses: 0
        };

        this.client.database.tags.set(`${struct.name}_${message.guild.id}`, struct);

        return message.reply(`✅ | Created tag ${struct.name}!`);
    }

}

module.exports = CreateTag;