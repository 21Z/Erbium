const Command = require('../../Base/Command.js');
const { MessageEmbed } = require('discord.js');
const { Spawn } = require('pokecord');

class Pokemon extends Command {

  constructor(client) {
    super(client);

    this.config({
      name: 'pokemon',
      aliases: ['pokemoninfo', 'pokeinfo', 'pokedex', 'pokémon'],
      description: 'Shows Pokémon info',
    });
  }

  async run(message, args) {
    const name = args[0];
    if (!name) return message.reply('❌ | Please include a pokémon name!');

    // eslint-disable-next-line no-unused-vars
    const pokemon = await Spawn(name.toLowerCase()).catch(e => { });
    if (!pokemon) return message.reply('Oops! Something went wrong...');
    const height = pokemon.height * 10;
    const kg = pokemon.weight / 10;
    const lbs = Math.floor(kg * 2.20462262);
    const embed = new MessageEmbed()
      .setTitle('Pokémon Info')
      .setThumbnail(pokemon.imageURL)
      .setColor('YELLOW')
      .addFields(
        { name: 'Name', value: `${pokemon.name}`, inline: true },
        { name: 'ID', value: `${pokemon.id}`, inline: true },
        { name: 'Base Experience', value: `${pokemon.baseExperience}`, inline: true },
        { name: 'Height', value: `${height}cm`, inline: true },
        { name: 'Weight', value: `${lbs}lbs (${kg}kg)`, inline: true },
        { name: 'Abilities', value: `${pokemon.abilities.map(m => `\`${m.ability.name}\``).join(', ') || 'None'}` },
        { name: 'Stats', value: `${pokemon.stats.map(m => `**${m.stat.name}**: \`${m.base_stat}\``).join('\n') || 'None'}` },
      )
      .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }

}

module.exports = Pokemon;