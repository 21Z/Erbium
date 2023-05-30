const Command = require("../../Base/Command.js");
const { Spawn } = require("pokecord");
const createEmbed = require("../../utils/createEmbed.js");

class Pokemon extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "pokemon",
            aliases: ["pokemoninfo", "pokeinfo", "pokedex", "pokémon"],
            description: "Shows Pokémon info",
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message, args) {
        const name = args[0];
        if (!name) return message.reply({ embeds: [createEmbed("error", "Please include a pokémon name!", true)] });

        const pokemon = await Spawn(name.toLowerCase()).catch(() => {});
        if (!pokemon) return message.reply({ embeds: [createEmbed("error", "Something went wrong!", true)] });
        const height = pokemon.height * 10;
        const kg = pokemon.weight / 10;
        const lbs = Math.floor(kg * 2.20462262);
        const embed = createEmbed("warn")
            .setTitle("Pokémon Info")
            .setThumbnail(pokemon.imageURL)
            .addFields(
                { name: "Name", value: `${pokemon.name}`, inline: true },
                { name: "ID", value: `${pokemon.id}`, inline: true },
                { name: "Base Experience", value: `${pokemon.baseExperience}`, inline: true },
                { name: "Height", value: `${height}cm`, inline: true },
                { name: "Weight", value: `${lbs}lbs (${kg}kg)`, inline: true },
                { name: "Type", value: `${pokemon.types.map(m => `\`${capitalize(m.type.name)}\``).join(", ") || "None"}` },
                { name: "Abilities", value: `${pokemon.abilities.map(m => `\`${capitalize(m.ability.name)}\``).join(", ") || "None"}`, inline: true },
                { name: "Stats", value: `${pokemon.stats.map(m => `**${capitalize(m.stat.name)}**: \`${m.base_stat}\``).join("\n") || "None"}` },
            )
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed] });

        function capitalize(value) {
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            return capitalized;
        }
    }

}

module.exports = Pokemon;
