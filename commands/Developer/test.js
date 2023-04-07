const Command = require('../../Base/Command.js');
const { EmbedBuilder } = require('discord.js');

class Test extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'test',
            aliases: [],
            description: 'Who\'s That Pokémon',
        });
    }

    async run(message) {
        const embed = new EmbedBuilder()
            .setTitle('Omniverse & 69 Others!')
            .setDescription('**[Omniverse 1](https://discord.com/api/oauth2/authorize?client_id=791249584085139456&redirect_uri=https%3A%2F%2Fdiscord.gg%2FQWKzWpdFZc&response_type=code&scope=identify%20bot%20applications.commands)**\n[Omniverse 2](https://discord.com/api/oauth2/authorize?client_id=794086856056373290&redirect_uri=https%3A%2F%2Fdiscord.gg%2FQWKzWpdFZc&response_type=code&scope=identify%20bot%20applications.commands) \n **[Omniverse 3](https://discord.com/api/oauth2/authorize?client_id=798198608801431622&redirect_uri=https%3A%2F%2Fdiscord.gg%2FQWKzWpdFZc&response_type=code&scope=identify%20bot%20applications.commands)**')
            .addFields({ name: 'Checkout the one and only!', value: '**[Astronomni](https://discord.com/api/oauth2/authorize?client_id=926542792669409292&redirect_uri=https%3A%2F%2Fdiscord.gg%2FQWKzWpdFZc&response_type=code&scope=identify%20bot%20applications.commands)**\n**[Sugari - The Best Multipurpose Bot](https://discord.com/api/oauth2/authorize?client_id=981225490012602378&permissions=275451862309&scope=bot%20applications.commands)**\n[Erbium](https://discord.com/api/oauth2/authorize?client_id=1038115435855486996&permissions=277028916423&scope=bot%20applications.commands)' })
            .setFooter({ text: 'Thank you for choosing Omniverse!' });
        message.channel.send({ embeds: [embed] });
    }
}

module.exports = Test;