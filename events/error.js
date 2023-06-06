const Event = require("../Base/Event.js");

class ErrorEvent extends Event {

    constructor(client) {
        super(client);
    }

    run(e) {
        this.client.logger.error(`ERROR :- ${e}`);
    }

}

module.exports = ErrorEvent;
