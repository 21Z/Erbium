const Event = require("../Base/Event.js");
const { Events } = require("discord.js");

class Error extends Event {

    constructor(client) {
        super(client);

        this.config({
            name: Events.ErrorEvent,
        });
    }

    run(e) {
        this.client.logger.error(`ERROR :- ${e}`);
    }

}

module.exports = Error;
