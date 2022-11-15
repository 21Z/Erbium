const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");

class Help extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "help",
            aliases: ["h", "command", "cmd", "commands", "menu"],
            description: "Shows available commands."
        });
    }

    async run(message, args) {
        const category = [...new Set(this.client.commands.commands.map(m => m.help.category))];
        const [query] = args;

        if (!query) {
            const embed = new MessageEmbed()
                .setTitle(`Commands - Total: ${this.client.commands.size}`)
                .setColor("RANDOM")
                .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            let x = 1;

            for (const i of category) {
                const cmd = this.client.commands.commands.filter(cmd => cmd.help.category === i).map(m => `\`${m.help.name}\``);
                embed.addField(`${x}. ${i}`, cmd.join(", "));
                x++;
            }

            return message.reply(embed);
        }

        if (category.some(q => q === query)) {
            const ctg = category.find(q => q.toLowerCase() === query.toLowerCase());
            const embed = new MessageEmbed()
                .setTitle("Commands")
                .setColor("RANDOM")
                .addField("Category", ctg)
                .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            const cmd = this.client.commands.commands.filter(cmd => cmd.help.category === ctg).map(m => `\`${m.help.name}\``);
            embed.setDescription(cmd.join(", "));

            return message.reply(embed);
        }

        const command = this.client.commands.resolve(query);
        if (!command) return message.reply("❌ | Command not found!");

        const embed = new MessageEmbed()
            .setTitle("Command Info")
            .setColor("RANDOM")
            .addField("Name", command.help.name, true)
            .addField("Aliases", !command.help.aliases.length ? "None" : command.help.aliases.map(m => `\`${m}\``).join(", "), true)
            .addField("Category", command.help.category, true)
            .addField("Description", command.help.description, true)
            .addField("Cooldown", `${Math.floor(command.help.cooldown ? command.help.cooldown / 1000 : 1)} Second(s)`, true)
            .addField("Owner Only", command.help.ownerOnly ? "Yes" : "No", true)
            .addField("Permissions", command.help.permissions.length ? command.help.permissions.map(m => `\`${m}\``).join(", ") : `None`)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.reply(embed);
    }

}

module.exports = Help;