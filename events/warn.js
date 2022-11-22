const Event = require("../Base/Event.js");
const logger = require("../utils/Logger.js");

class Warn extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        logger.warn(`WARN :- ${message}`);
    }

}

module.exports = Warn;