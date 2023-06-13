const Event = require("../Base/Event.js");
const { Events } = require("discord.js");

class Warn extends Event {

    constructor(client) {
        super(client);

        this.config({
            name: Events.Warn,
        });
    }

    run(message) {
        this.client.logger.warn(`WARN :- ${message}`);
    }

}

module.exports = Warn;
