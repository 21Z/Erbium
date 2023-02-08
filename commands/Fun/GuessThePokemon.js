const Command = require('../../Base/Command.js');
const { EmbedBuilder } = require('discord.js');
const { Spawn } = require('pokecord');

class GuessThePokemon extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'wtp',
            aliases: ['guessthepokemon', 'guessthepokémon', 'gtp'],
            description: 'Who\'s That Pokémon',
        });
    }

    async run(message) {
        const pokemon = await Spawn().catch();
        if (!pokemon) return message.reply('Opps! Something went wrong :(');

        const msg_filter = m => m.author.id === message.author.id;

        const embed = new EmbedBuilder()
            .setTitle('Who\'s That Pokémon')
            .setDescription('You have 30 seconds to answer!')
            .setImage(pokemon.imageURL)
            .setColor('Yellow')
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        await message.reply({ embeds: [embed] });

        message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            error: ['time'],
            time: 30000,
        })
            .then(collected => {
                const m = collected.first();
                if (!m.content || m.content.toLowerCase() !== pokemon.name.toLowerCase()) return m.reply(`❌ | Incorrect guess! The answer was **${pokemon.name}**.`);
                return m.reply('✅ | Correct guess!');
            })
            .catch(() => {
                message.reply(`❌ | You did not answer in time. The correct answer was **${pokemon.name}**!`);
            });
    }

}

module.exports = GuessThePokemon;
