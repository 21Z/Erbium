const Event = require("../Base/Event.js");
const logger = require("../utils/Logger.js");

class Debug extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        if (!this.client.config.DEV_MODE) return;

        logger.info(`DEBUG :- ${message}`);
    }

}

module.exports = Debug;