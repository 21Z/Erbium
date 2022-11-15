const Event = require("../../Base/Event.js");

class ChannelEmpty extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        void message.reply("❌ | There are no members in the voice channel, stopping the music!");
    }

}

module.exports = ChannelEmpty;