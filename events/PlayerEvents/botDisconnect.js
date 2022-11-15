import Event from "../../Base/Event.js";

class BotDisconnect extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        void message.reply("❌ | I have been disconnected from the voice channel!");
    }

}

export default BotDisconnect;