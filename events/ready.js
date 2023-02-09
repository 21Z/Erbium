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
    }
}

module.exports = Ready;
