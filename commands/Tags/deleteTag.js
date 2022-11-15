const Command = require("../../Base/Command");

class DeleteTag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "deletetag",
            aliases: ["removetag", "rmtag"],
            description: "Delete a tag",
            permissions: ["MANAGE_MESSAGES"]
        });
    }

    async run(message, args) {
        const [tagname] = args;

        if (!tagname.toLowerCase()) return message.reply("❌ | Please include a tag name!");

        if (!this.client.database.tags.has(`${tagname.toLowerCase()}_${message.guild.id}`)) return message.reply(`❌ | Tag ${tagname.toLowerCase()} is not available!`);

        this.client.database.tags.delete(`${tagname.toLowerCase()}_${message.guild.id}`);

        return message.reply(`✅ | Removed tag ${tagname.toLowerCase()}!`);
    }

}

module.exports = DeleteTag;