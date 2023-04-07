const { EmbedBuilder } = require('discord.js');
const Command = require('../../Base/Command');

class UnBan extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: 'unban',
            aliases: ['unb'],
            description: 'Unban a user from the server!',
            botPerms: ['BanMembers', 'EmbedLinks'],
            permissions: ['BanMembers', 'EmbedLinks'],
        });
    }

    async run(message, args) {
        await this.client.users.fetch(args[0]).catch(() => {});
        const target = message.mentions.members.first() || this.client.resolveUser(args[0]);
        const moderator = `by ${message.author.tag}, ID: ${message.author.id}`;
        const embedreason = args.slice(1).join(' ') || 'None';
        let reason = args.slice(1).join(' ') || 'Unbanned ' + moderator;
        if (reason === args.slice(1).join(' ')) reason = reason + ', ' + moderator;
        if (!target) return message.reply('❌ | Please specify a valid user who you want to unban!');

        // If the user is not banned
        const bans = await message.guild.bans.fetch();
        if (!bans.some((m) => m.user.id === target.id)) return message.reply('❌ | The user you specified is not banned!');

        const embed = new EmbedBuilder()
            .setTitle('Action: Unban')
            .setDescription(`Unbanned ${target} (\`${target.tag}\`)\nReason: ${embedreason}`)
            .setColor('Green')
            .setThumbnail(target.displayAvatarURL())
            .setFooter({
                text: `Unbanned by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL(),
            });

        await message.guild.bans.remove(target.id, { reason: reason }).then(() => {
            message.channel.send({ embeds: [embed] });
        });
    }
}

module.exports = UnBan;