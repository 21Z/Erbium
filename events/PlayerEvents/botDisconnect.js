const Event = require("../../Base/Event.js");

class BotDisconnect extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        void message.reply("❌ | I have been disconnected from the voice channel!");
    }

}

module.exports = BotDisconnect;