const Event = require("../Base/Event.js");

class Error extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    run(e) {
        this.client.logger.error(`ERROR :- ${e}`);
    }

}

module.exports = Error;
