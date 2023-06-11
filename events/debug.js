const Event = require("../Base/Event.js");
const { Events } = require("discord.js");

class Debug extends Event {

    constructor(client) {
        super(client);

        this.config({
            name: Events.Debug,
        });
    }

    run(message) {
        if (!this.client.config.DEV_MODE) return;

        this.client.logger.info(`DEBUG :- ${message}`);
    }

}

module.exports = Debug;
