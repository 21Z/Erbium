const Command = require("../../Base/Command.js");
const { MessageEmbed, version } = require("discord.js");
const os = require("os");

class BotInfo extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "botinfo",
            aliases: ["bi"],
            description: "Bot information"
        });
    }

    async run(message) {
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

        const embed = new MessageEmbed()
            .setAuthor("Bot Information", message.guild.iconURL())
            .setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
            .setDescription(`${this.client.user.username} is an open-source multipurpose discord bot developed by **[Snowflake](https://github.com/Snowflake107)**.`)
            .setColor("RANDOM")
            .addField("Name", this.client.user.username, true)
            .addField("Discriminator", this.client.user.discriminator, true)
            .addField("Type", this.client.user.bot ? "Bot" : "User", true)
            .addField("Prefix", message.guild.prefix, true)
            .addField("ID", this.client.user.id, true)
            .addField("Owners", `${admins.map(m => `<@!${m}>`).join(", ")}`, true)
            .addField("Created At", this.client.user.createdAt.toString())
            .addField("\u200b", `\`\`\`asciidoc\n${SystemString}\`\`\``)
            .addField("GitHub (Source Code)", "**[Click Here](https://github.com/erbiumbot/Erbium)**")
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        return message.reply(embed);
    }
}

module.exports = BotInfo;