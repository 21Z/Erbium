const { EmbedBuilder } = require('discord.js');
const Command = require('../../Base/Command');

class Ban extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'ban',
            aliases: ['b'],
            description: 'Ban a user from the server!',
            botPerms: ['BanMembers', 'EmbedLinks'],
            permissions: ['BanMembers', 'EmbedLinks'],
        });
    }

    async run(message, args) {
        await message.guild.members.fetch(args[0]).catch(() => {}) || await this.client.users.fetch(args[0]).catch(() => {});
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || this.client.resolveUser(args[0]);
        const moderator = `by ${message.author.tag}, ID: ${message.author.id}`;
        const embedreason = args.slice(1).join(' ') || 'None';
        let reason = args.slice(1).join(' ') || 'Banned ' + moderator;
        if (reason === args.slice(1).join(' ')) reason = reason + ', ' + moderator;
        if (!target) return message.reply('❌ | Please specify a valid user who you want to ban!');

        if (target.id === message.author.id) return message.reply('❌ | You can not ban yourself!');
        if (target.id === message.guild.ownerId) return message.reply('❌ | You can not ban the server owner!');
        if (message.guild.members.cache.has(target.id) && target.roles.highest.position > message.member.roles.highest.position) {
            return message.reply('❌ | You cannot ban someone with a higher role than yours!');
        }
        if (message.guild.members.cache.has(target.id) && !target.bannable) return message.reply('❌ | I cannot ban this user!');

        // If the user is already banned
        const bans = await message.guild.bans.fetch();
        if (bans.some((m) => m.user.id === target.id)) return message.reply(`❌ | ${target} is already banned!`);

        const embed = new EmbedBuilder()
            .setTitle('Action: Ban')
            .setDescription(`Banned ${target} (\`${target.user?.tag ?? target.tag ?? target}\`)\nReason: ${embedreason}`)
            .setColor('Red')
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Banned by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await message.guild.bans.create(target.id, { reason: reason }).then(() => {
            message.channel.send({ embeds: [embed] });
        });
    }
}

module.exports = Ban;