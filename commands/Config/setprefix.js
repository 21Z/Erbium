const Command = require("../../Base/Command");

class SetPrefix extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "setprefix",
            aliases: ["prefix"],
            description: "Sets guild prefix",
            permissions: ["MANAGE_GUILD"]
        });
    }

    async run(message, args) {
        const prefix = args.join(" ");
        if (!prefix) return message.reply("❌ | Please specify a new command prefix to set! You can use `none` to reset.");
        if (prefix.length > 7) return message.reply("❌ | Prefix may not exceed 7 characters!");

        message.guild.prefix = prefix === "none" ? null : prefix;

        return message.reply(`✅ | Prefix set to **"\`${message.guild.prefix}\`"**!`);
    }

}

module.exports = SetPrefix;