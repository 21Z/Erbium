const Event = require("../Base/Event.js");
const logger = require("../utils/Logger.js");

class ErrorEvent extends Event {

    constructor(client) {
        super(client);
    }

    run(e) {
        logger.error(`ERROR :- ${e}`);
    }

}

module.exports = ErrorEvent;