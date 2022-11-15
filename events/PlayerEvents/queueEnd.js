const Event = require("../../Base/Event.js");

class QueueEnd extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        void message.reply("✅ | Queue ended!");
    }

}

module.exports = QueueEnd;