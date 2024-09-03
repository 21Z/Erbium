const Event = require("../Base/Event.js");
const { PermissionsBitField } = require("discord.js");
const cooldowns = new (require("discord.js").Collection)();

class MessageCreate extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    async run(message) {
        message.author.dev = this.client.config.OWNER.some(x => x === message.author.id);

        // ignore bots
        if (message.author.bot || message.system) return;
        // dev mode
        if (this.client.config.DEV_MODE && !message.author.dev) return;

        const prefix = this.client.config.PREFIX;
        if (new RegExp(`^<@!?${this.client.user.id}>( |)$`).test(message.content)) return message.reply(`My prefix is **"\`${prefix}\`"**!`);

        // ignore non-prefix
        if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(" ");
        const cmd = args.shift().toLowerCase();
        const command = this.client.commands.resolve(cmd);

        // ignore invalid commands
        if (!command) {
            const tag = await this.client.database.tags.get(`${cmd}_${message.guild.id}`);
            if (!tag) return;
            return message.channel.send(tag.content, { split: true, disableMentions: "everyone" }).then(() => {
                const struct = {
                    ...tag,
                    uses: tag.uses + 1,
                };

                this.client.database.tags.set(`${cmd}_${message.guild.id}`, struct);
            });
        }
        if (command.help.ownerOnly && !message.author.dev) return;

        if (!message.member.permissionsIn(message.channel).has(PermissionsBitField.Flags[command.help.permissions] ?? [])) return message.reply(`❌ | You don't have enough permissions to use this command!\nPermissions Required: ${command.help.permissions.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);
        if (!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags[command.help.botPerms] ?? [])) return message.reply(`❌ | I do not have enough permissions to use this command!\nPermissions Required: ${command.help.botPerms.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);

        const cooldown = cooldowns.get(`${command.help.name}_${message.author.id}`);
        if (cooldown && (command.cooldown) - (Date.now() - cooldown) > 0) {
            if (cooldowns.get(`_${command.help.name}_${message.author.id}`)) return;
            cooldowns.set(`_${command.help.name}_${message.author.id}`, true);
            message.react("⏳").catch(() => {});
            return message.reply(`❌ | You can use this command again **<t:${Math.round(((cooldown + command.cooldown + 500)) / 1000)}:R>**`)
                .then(m => {
                    setTimeout(function() {
                        m.delete().catch(() => {});
                        cooldowns.delete(`_${command.help.name}_${message.author.id}`);
                    }, Math.round(((command.cooldown) - (Date.now() - cooldown)) + 500));
                });
        }
        cooldowns.set(`${command.help.name}_${message.author.id}`, Date.now());

        try {
            await command.run(message, args);
        } catch (e) {
            await message.reply(`❌ | **Error!**\`\`\`js\n${e.toString()}\n\`\`\``);
            this.client.logger.error(`Command: ${command.help.name}`, e);
        }
    }

}

module.exports = MessageCreate;
