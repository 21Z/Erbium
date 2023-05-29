const Event = require("../Base/Event.js");
const logger = require("../utils/Logger.js");
const cooldowns = new (require("discord.js").Collection)();
const { Configuration, OpenAIApi } = require("openai");
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

class MessageCreate extends Event {

    constructor(client) {
        super(client);
    }

    async run(message) {
        message.author.dev = this.client.config.OWNER.some(x => x === message.author.id);

        // ignore bots
        if (message.author.bot || message.system) return;
        // dev mode
        if (this.client.config.DEV_MODE && !message.author.dev) return;

        const prefix = this.client.config.PREFIX;
        if (new RegExp(`^<@!?${this.client.user.id}>( |)$`).test(message.content)) return message.reply(`My prefix is **"\`${prefix}\`"**!`);

        // chatbot
        if (this.client.config.CHANNEL_ID.includes(message.channel.id)) {
            if (message.content.startsWith("!")) return;
            try {
                await message.channel.sendTyping();
                if (message.content.length > 2000 || !message.content || message.content === "") {
                    message.reply("Sorry, I can't get that, please send a valid query and try again.");
                    return;
                }
                let prevMessages = await message.channel.messages.fetch({ limit: 75 });
                prevMessages = prevMessages.sort((a, b) => a - b);

                const conversationLog = [
                    {
                        role: "system",
                        content: "You are a Discord ChatBot that gives funny and useful responses" },
                ];
                prevMessages.forEach((msg) => {
                    if (msg.content.startsWith("!") || msg.content.length > 2000) return;
                    if (msg.author.id !== this.client.user.id && message.author.bot) return;
                    if (msg.author.id !== message.author.id) return;

                    conversationLog.push({
                        role: "user",
                        content: `${msg.content}`,
                    });
                });
                const completion = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: conversationLog,
                    }),
                    result = completion.data.choices[0];
                if (result.message.content.length > 2000) {
                    const reply = await this.client.utils.hastebin(result.message.content.replace(/(?![^\n]{1,148}$)([^\n]{1,148})\s/g, "$1\n"));
                    return await message.reply(`! Output too long, Hastebin:\n${reply}`);
                }
                message.reply(result.message.content);
            } catch (e) {
                if (e.toString().includes("status code 429")) return message.reply("The API is being ratelimited!" + `\`\`\`js\n${e.toString()}\n\`\`\``);
                message.reply("Something went wrong!" + `\`\`\`js\n${e.toString()}\n\`\`\``);
            }
        }
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
            }).catch((e) => { console.error(e); });
        }
        if ((command.category === "Developer" || command.ownerOnly) && !message.author.dev) return;

        if (!message.member.permissions.has(command.help.permissions)) return message.reply(`❌ | You don't have enough permissions to use this command!\nPermissions Required: ${command.help.permissions.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);
        if (!message.guild.members.me.permissionsIn(message.channel).has(command.help.botPerms)) return message.reply(`❌ | I do not have enough permissions to use this command!\nPermissions Required: ${command.help.botPerms.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);

        const cooldown = cooldowns.get(`${command.help.name}_${message.author.id}`);
        if (cooldown && (command.cooldown) - (Date.now() - cooldown) > 0) {
            message.react("⏳").catch(() => {});
            return message.reply(`❌ | You can use this command again <t:${Math.round(((cooldown + command.cooldown)) / 1000)}:R>`)
                .then(m => {
                    setTimeout(function() {
                        m.delete().catch(() => {});
                    }, Math.round(((command.cooldown) - (Date.now() - cooldown))));
                });
        }
        cooldowns.set(`${command.help.name}_${message.author.id}`, Date.now());

        try {
            await command.run(message, args);
        } catch (e) {
            await message.reply(`❌ | **Error!**\`\`\`js\n${e.toString()}\n\`\`\``).catch(() => {});
            logger.error(`Command: ${command.help.name} - ${e.toString()}`);
        }
    }

}

module.exports = MessageCreate;
