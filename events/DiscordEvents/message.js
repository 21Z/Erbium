const Event = require("../../Base/Event.js");
const logger = require("../../utils/Logger.js");
const cooldowns = new (require("discord.js").Collection)();

class Message extends Event {

    constructor(client) {
        super(client);
    }

    async run(message) {
        // ignore bots
        if (message.author.bot) return;
        
        // ignore dm messages
        if (message.channel.type === "dm") return;
        
        const prefix = message.guild.prefix;
        
        if (new RegExp(`^<@!?${this.client.user.id}>( |)$`).test(message.content)) return message.reply(`My prefix for this server is **"\`${prefix}\`"**!`);

        // ignore non-prefix
        if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return;

        // dev mode
        if (this.client.config.DEV_MODE && !message.author.dev) return message.reply("❌ | Bot is set to `DEV_ONLY` mode.");

        const [cmd, args] = message.args.default;
        const command = this.client.commands.resolve(cmd);

        // ignore invalid commands
        if (!command) {
            const tag = this.client.database.tags.get(`${cmd}_${message.guild.id}`);
            if (!tag) return;
            return message.channel.send(tag.content, { split: true, disableMentions: "everyone" }).then(() => {
                const struct = {
                    ...tag,
                    uses: tag.uses + 1
                };

                this.client.database.tags.set(`${cmd}_${message.guild.id}`, struct);
            }).catch(() => {});
        };
        if ((command.category === "Developer" || command.ownerOnly) && !message.author.dev) return message.reply("❌ | You don't have `DEVELOPER` permission to use this command.");
        if (!message.member.permissions.has(command.help.permissions)) return message.reply(`❌ | You don't have ${command.help.permissions.map(m => `\`${m}\``).join(", ")} permission(s) to use this command!`);

        const cooldown = cooldowns.get(`${command.help.name}_${message.author.id}`);
        if (cooldown && (command.cooldown) - (Date.now() - cooldown) > 0) {
            return message.reply(`❌ | Please wait for **${Math.round(((command.cooldown) - (Date.now() - cooldown)) / 1000)}** seconds before using **\`${command.help.name}\`** command again!`);
        }
        cooldowns.set(`${command.help.name}_${message.author.id}`, Date.now());

        try {
            await command.run(message, args);
        } catch(e) {
            await message.reply(`❌ | **Error Ahoy!**\`\`\`js\n${e.toString()}\`\`\``).catch(() => {});
            logger.error(`Command: ${command.help.name} - ${e.toString()}`);
        }
    }

}

module.exports = Message;