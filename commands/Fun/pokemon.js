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
            .addFields(
                { name: 'Name', value: pokemon.name, inline: true },
                { name: 'ID', value: pokemon.id, inline: true },
                { name: 'Base Experience', value: pokemon.baseExperience, inline: true },
                { name: 'Height', value: pokemon.height, inline: true },
                { name: 'Weight', value: pokemon.weight, inline: true },
                { name: 'Abilities', value: pokemon.abilities.map(m => `\`${m.ability.name}\``).join(", ") || "None" },
                { name: 'Stats', value: pokemon.stats.map(m => `**${m.stat.name}**: \`${m.base_stat}\``).join("\n") || "None" },
            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply(embed);
    }

}

module.exports = Pokemon;