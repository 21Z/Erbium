const Command = require("../../Base/Command.js");
const { MessageEmbed } = require("discord.js");
const { Spawn } = require("pokecord");

class Pokemon extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "pokemon",
            aliases: ["pokemoninfo", "pokeinfo", "pokedex", "pokémon"],
            description: "Shows Pokémon info"
        });
    }

    async run(message, args) {
        const name = args[0];
        if (!name) return message.reply("❌ | Please include a pokémon name!");

        const pokemon = await Spawn(name.toLowerCase()).catch(e => { });
        if (!pokemon) return message.reply("Opps! Something went wrong :(");

        const embed = new MessageEmbed()
            .setTitle("Pokémon Info")
            .setThumbnail(pokemon.imageURL)
            .setColor("YELLOW")
            .addField("Name", pokemon.name, true)
            .addField("ID", pokemon.id, true)
            .addField("Base Experience", pokemon.baseExperience, true)
            .addField("Height", pokemon.height, true)
            .addField("Weight", pokemon.weight, true)
            .addField("Abilities", pokemon.abilities.map(m => `\`${m.ability.name}\``).join(", ") || "None")
            .addField("Stats", pokemon.stats.map(m => `**${m.stat.name}**: \`${m.base_stat}\``).join("\n") || "None")
            .addField("Types", pokemon.types.map(m => `\`${m.type.name}\``).join(", ") || "None")
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        message.reply(embed);
    }

}

module.exports = Pokemon;