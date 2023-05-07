const Command = require("../../Base/Command");
const createEmbed = require("../../utils/createEmbed");

class EditTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "edittag",
            aliases: ["tagedit", "updatetag"],
            description: "Edit a tag",
            permissions: ["MessageMessages"],
        });
    }

    async run(message, args) {
        const [tagname, ...rawcontent] = args;
        const content = rawcontent.join(" ");

        if (!tagname.toLowerCase()) return message.reply({ embeds: [createEmbed("warn", "Please include a tag name!")] });

        if (!this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply({ embeds: [createEmbed("error", `Tag ${tagname.toLowerCase()} is not available!`, true)] });

        if (!content) return message.reply({ embeds: [createEmbed("warn", "Please include new tag content!")] });

        const struct = {
            ...await this.client.database.tags.get(`${tagname.toLowerCase()}_${message.guild.id}`),
            content: content,
        };

        await this.client.database.tags.set(`${tagname.toLowerCase()}_${message.guild.id}`, struct);

        return message.reply(`✅ | Modified tag ${struct.name}!`);
    }

}

module.exports = EditTag;
