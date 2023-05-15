const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Help extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "help",
            aliases: ["h", "command", "cmd", "commands", "menu"],
            description: "Shows available commands.",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const category = [...new Set(this.client.commands.commands.filter(m => !m.help.ownerOnly).map(m => m.help.category))];
        const [query] = args;

        if (!query) {
            const embed = createEmbed("info")
                .setTitle(`Commands - Total: ${this.client.commands.size}`)
                .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();
            let x = 1;

            for (const i of category) {
                const cmd = this.client.commands.commands.filter(command => command.help.category === i).map(m => `\`${m.help.name}\``);
                embed.addFields({ name: `${x}. ${i}`, value: cmd.join(", ") });
                x++;
            }

            return message.reply({ embeds: [embed] });
        }

        if (category.some(q => q.toLowerCase() === query.toLowerCase())) {
            const ctg = category.find(q => q.toLowerCase() === query.toLowerCase());
            const embed = createEmbed("info")
                .setTitle("Commands")
                .addFields({ name: "Category", value: ctg, inline: true })
                .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();

            const cmd = this.client.commands.commands.filter(command => command.help.category === ctg).map(m => `\`${m.help.name}\``);
            embed.setDescription(cmd.join(", "));

            return message.reply({ embeds: [embed] });
        }

        const command = this.client.commands.resolve(query.toLowerCase());
        if (!command) return message.reply({ embeds: [createEmbed("error", "Command not found!", true)] });

        const embed = createEmbed("info")
            .setTitle("Command Info")
            .addFields(
                { name: "Name", value: command.help.name, inline: true },
                { name: "Aliases", value: !command.help.aliases.length ? "None" : command.help.aliases.map(m => `\`${m}\``).join(", "), inline: true },
                { name: "Category", value: command.help.category, inline: true },
                { name: "Description", value: command.help.description, inline: true },
                { name: "Cooldown", value: `${Math.floor(command.help.cooldown ? command.help.cooldown / 1000 : 1)} Second(s)`, inline: true },
                { name: "Owner Only", value: command.help.ownerOnly ? "Yes" : "No", inline: true },
                { name: "Bot Permissions", value: command.help.botPerms.length ? command.help.botPerms.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ") : "None" },
                { name: "Permissions", value: command.help.permissions.length ? command.help.permissions.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ") : "None", inline: true },
            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }

}

module.exports = Help;
