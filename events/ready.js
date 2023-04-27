const Event = require('../Base/Event.js');
const logger = require('../utils/Logger.js');
const { ActivityType } = require('discord.js');

class Ready extends Event {

    constructor(client) {
        super(client);
    }

    run() {
        logger.success('Bot is online!');

        this.client.user.setActivity('on Youtube', {
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        });
        /* setInterval(() => {
            const embed = new require('discord.js').EmbedBuilder()
                .setTitle('Bot Stats')
                .setDescription(`*Last updated <t:${Math.round(Date.now() / 1000)}:R>*`)
                .addFields(
                    { name: 'Uptime', value: this.client.utils.formatDuration(this.client.uptime) },
                    { name: 'To Do (Upcoming):', value: `<:yes:1096131206652899348> Better Embed color management
                    📝 Switch most replies to embeds
                    📝 Better error handling (stop bot crashes)
                    <:no:1096131211052732457> Add 'Type' to \`pokemon\` command` },
                    { name: 'Notes', value: `<:yes:1096131206652899348> = Done, not deployed.
                    📝 = Working on it.
                    <:no:1096131211052732457> = Not done, Soon™️` },
                )
                .setFooter({ text: 'This embed is updated every 20 seconds' })
                .setColor(0x4d5e94);
            this.client.channels.fetch('901445050926497804').then((c) => {
                c.messages.fetch('1097222535227129876').then((m) => {
                    m.edit({ embeds: [embed] });
                });
            });
        }, 20000); */
    }
}

module.exports = Ready;
