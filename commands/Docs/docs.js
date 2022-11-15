const Command = require("../../Base/Command");
const docs = require("snowflake-studio-docs");

class Docs extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "docs",
            aliases: ["doc"],
            description: "Documentation command"
        });
    }

    async run(message, args) {
        const src = args.shift();
        if (!src) return message.reply(`❌ | Please include the source! Can be one of ${this.source.map(m => `\`${m}\``)}.`);
        if (!this.source.includes(src.toLowerCase())) return message.reply(`❌ | Docs source must be one of ${this.source.map(m => `\`${m}\``)}.`);
        const query = args.join(".");
        if (!query) return message.reply("❌ | Please include a search query!");

        const source = this.sources[src.toLowerCase()];

        docs.fetch(source)
            .then(doc => {
                const embed = doc.resolveEmbed(query, { excludePrivateElements: true });
                message.reply({ embed });
            })
            .catch(() => {
                message.reply("❌ | Could not fetch docs!");
            })
    }

    get source() {
        return ["discord.js", "discord-player", "canvacord", "quickmongo", "soundcloud-scraper", "quick.eco", "insta.js"];
    }

    get sources() {
        const data = {};

        this.source.forEach(d => {
            switch(d) {
                case "discord.js":
                    data[d] = "https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json";
                    break;
                case "insta.js":
                    data[d] = "https://raw.githubusercontent.com/Androz2091/insta.js/docs/master.json";
                    break;
                case "quick.eco":
                    data[d] = "eco";
                    break;
                case "soundcloud-scraper":
                    data[d] = "soundcloud";
                    break;
                default:
                    data[d] = d;
            }
        });

        return data;
    }

}

module.exports = Docs;