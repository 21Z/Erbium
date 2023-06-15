const Event = require("../Base/Event.js");

class Warn extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    run(message) {
        this.client.logger.warn(`WARN :- ${message}`);
    }

}

module.exports = Warn;
