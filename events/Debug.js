const Event = require("../Base/Event.js");

class Debug extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    run(message) {
        if (!this.client.config.DEV_MODE) return;

        this.client.logger.info(`DEBUG :- ${message}`);
    }

}

module.exports = Debug;
