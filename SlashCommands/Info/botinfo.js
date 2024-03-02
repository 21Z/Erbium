const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");
const { version } = require("discord.js");
const os = require("os");

class BotInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "botinfo",
            description: "Bot information",
        });
    }

    async run(interaction) {
        const admins = this.client.config.OWNER;
        const SystemString = `= System Info =
• Total Commands :: ${this.client.commands.size.toLocaleString()}
• Memory Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Bot Uptime     :: ${this.client.utils.formatDuration(this.client.uptime)}
• Users          :: ${this.client.users.cache.size.toLocaleString()}
• Servers        :: ${this.client.guilds.cache.size.toLocaleString()}
• Channels       :: ${this.client.channels.cache.size.toLocaleString()}
• Discord.js     :: v${version}
• Node           :: ${process.version}
• CPU            :: ${os.cpus()[0].model} (x${os.cpus().length})
• Memory         :: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB
• OS             :: ${this.client.utils.properCase(os.platform() === "win32" ? "windows" : os.platform())}`;

        const embed = createEmbed("info")
            .setAuthor({ name: "Bot Information", iconURL: interaction.guild.iconURL() })
            .setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
            .setDescription(`${this.client.user.username} is a discord bot developed by **[21Z](https://github.com/21Z)**.`)
            .addFields(
                { name: "Name", value: this.client.user.username, inline: true },
                { name: "Discriminator", value: this.client.user.discriminator, inline: true },
                { name: "Type", value: this.client.user.bot ? "Bot" : "User", inline: true },
                { name: "ID", value: this.client.user.id, inline: true },
                { name: "Owners", value: `${admins.map(m => `<@!${m}>`).join(", ")}`, inline: true },
                { name: "Created At", value: `<t:${Math.floor(this.client.user.createdTimestamp / 1000)}:F>` },
                { name: "\u200b", value: `\`\`\`asciidoc\n${SystemString}\`\`\`` },
                { name: "GitHub (Source Code)", value: "**[Click Here](https://github.com/21Z/Erbium)**" },
            )
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }

}

module.exports = BotInfo;
