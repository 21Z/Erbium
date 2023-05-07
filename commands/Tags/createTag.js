const Command = require("../../Base/Command");
const createEmbed = require("../../utils/createEmbed");

class CreateTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "createtag",
            aliases: ["addtag", "newtag"],
            description: "Creates new tag",
            permissions: ["ManageMessages"],
        });
    }

    async run(message, args) {
        const [tagname, ...rawcontent] = args;
        const content = rawcontent.join(" ");

        if (!tagname) return message.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (await this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} already exists!`, true)] });
        if (this.client.commands.has(tagname.toLowerCase())) return message.reply({ embeds: [createEmbed("error", `Tag name ${tagname.toLowerCase()} is not available!`, true)] });
        if (!content) return message.reply({ embeds: [createEmbed("warn", "Please include tag content!")] });

        const struct = {
            name: tagname.toLowerCase(),
            content: content,
            author: message.author.id,
            createdAt: Date.now(),
            uses: 0,
        };

        this.client.database.tags.set(`${struct.name}_${message.guild.id}`, struct);

        return message.reply(`✅ | Created tag ${struct.name}!`);
    }

}

module.exports = CreateTag;
