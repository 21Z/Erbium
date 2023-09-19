const Command = require("../../Base/Command.js");
const { Spawn } = require("pokecord");
const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Pokemon extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "pokemon",
            description: "Shows Pokémon info",
            options: [
                {
                    name: "name",
                    description: "Name of the Pokémon to show info about",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        });
    }

    async run(interaction) {
        const name = interaction.options.getString("name");
        if (!name) return interaction.reply({ embeds: [createEmbed("error", "Please include a pokémon name!", true)] });

        const pokemon = await Spawn(name.toLowerCase()).catch(() => {});
        if (!pokemon) return interaction.reply({ embeds: [createEmbed("error", "Something went wrong!", true)] });
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
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });

        function capitalize(value) {
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            return capitalized;
        }
    }

}

module.exports = Pokemon;
