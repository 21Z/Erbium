const Event = require("../../Base/Event.js");

class PlaylistAdd extends Event {

    constructor(client) {
        super(client);
    }

    run(message, queue, playlist) {
        void message.reply(`✅ | Playlist **${playlist?.title ?? "Unknown Title"}** has been added to the queue!`);
    }

}

module.exports = PlaylistAdd;