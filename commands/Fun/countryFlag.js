const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");
const flag = require("fetch-country-flag");

class CountryFlag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "countryflag",
            aliases: ["cflag"],
            description: "Shows flag of a country"
        });
    }

    async run(message, args) {
        const name = args.join(" ");
        if (!name) return message.reply("❌ | Please include country name!");

        const cf = await flag(encodeURIComponent(name.toLowerCase()), {
            type: "png",
            theme: "flat",
            size: "64"
        }).catch(e => { });

        if (!cf || !cf.name) return message.reply("❌ | Something went wrong :(");

        const embed = new MessageEmbed()
            .setTitle(cf.name)
            .setImage(cf.flag)
            .setColor("RED")
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        message.reply(embed);
    }

}

module.exports = CountryFlag;