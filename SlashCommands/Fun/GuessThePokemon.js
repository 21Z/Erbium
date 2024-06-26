const Command = require("../../Base/Command.js");
const { Spawn } = require("pokecord");
const createEmbed = require("../../utils/createEmbed.js");

class GuessThePokemon extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "wtp",
            description: "Who's That Pokémon",
        });
    }

    async run(interaction) {
        const pokemon = await Spawn().catch(() => {});
        if (!pokemon) return interaction.reply({ embeds: [createEmbed("error", "Something went wrong!", true)] });

        const msg_filter = m => m.author.id === interaction.user.id;

        const embed = createEmbed("warn")
            .setTitle("Who's That Pokémon")
            .setDescription("You have 30 seconds to answer!")
            .setImage(pokemon.imageURL)
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

        interaction.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            error: ["time"],
            time: 30000,
        })
            .then(collected => {
                const m = collected.first();
                if (!m.content || m.content.toLowerCase() !== pokemon.name.toLowerCase()) return m.reply(`❌ | Incorrect guess! The answer was **${pokemon.name}**.`);
                return m.reply("✅ | Correct guess!");
            })
            .catch(() => {
                interaction.followUp({ embeds: [createEmbed("error", `You did not answer in time. The correct answer was **${pokemon.name}**!`, true)] });
            });
    }

}

module.exports = GuessThePokemon;
