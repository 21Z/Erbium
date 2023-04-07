const { EmbedBuilder } = require('discord.js');
const Command = require('../../Base/Command');

class Kick extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'kick',
            aliases: ['k'],
            description: 'Kick a user from the server!',
            botPerms: ['KickMembers', 'EmbedLinks'],
            permissions: ['KickMembers', 'EmbedLinks'],
        });
    }

    async run(message, args) {
        await message.guild.members.fetch(args[0]).catch(() => {});
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const moderator = `by ${message.author.tag}, ID: ${message.author.id}`;
        const embedreason = args.slice(1).join(' ') || 'None';
        let reason = args.slice(1).join(' ') || 'Kicked' + moderator;
        if (reason === args.slice(1).join(' ')) reason = reason + ', ' + moderator;
        if (!target) return message.reply('❌ | Please specify a valid user who you want to kick!');

        if (target.id === message.author.id) return message.reply('❌ | You can not kick yourself!');
        if (target.id === message.guild.ownerId) return message.reply('❌ | You can not kick the server owner!');
        if (message.guild.members.cache.has(target.id) && target.roles.highest.position > message.member.roles.highest.position) {
            return message.reply('❌ | You cannot kick someone with a higher role than yours!');
        }
        if (!target.kickable) return message.reply('❌ | I cannot kick this user!');

        const embed = new EmbedBuilder()
            .setTitle('Action: Kick')
            .setDescription(`Kicked ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)\nReason: ${embedreason}`)
            .setColor('Red')
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Kicked by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await message.guild.members.kick(target.id, { reason: reason }).then(() => {
            message.channel.send({ embeds: [embed] });
        });
    }
}

module.exports = Kick;