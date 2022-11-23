const Command = require('../../Base/Command.js');
const { MessageEmbed } = require('discord.js');

class UserInfo extends Command {

  constructor(client) {
    super(client);

    this.config({
      name: 'userinfo',
      aliases: ['ui'],
      description: 'User information',
    });
  }

  async run(message, args) {
    const embedColor = (this.client.config.EMBED_COLOR.toUpperCase() ?? '') || '22C9FF';
    const user = message.mentions.users.first() || this.client.resolveUser(args.join(' ')) || message.author;

    const embed = new MessageEmbed()
      .setAuthor({ name: 'User Information', iconURL: message.guild.iconURL() })
      .setThumbnail(user.displayAvatarURL({ size: 4096 }))
      .setColor(embedColor)
      .addFields(
        { name: 'Name', value: user.username, inline: true },
        { name: 'Discriminator', value: user.discriminator, inline: true },
        { name: 'Type', value: user.bot ? 'Bot' : 'User', inline: true },
        { name: 'ID', value: user.id, inline: true },
        { name: 'Created At', value: user.createdAt.toString() },
      )
      .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  }
}

module.exports = UserInfo;