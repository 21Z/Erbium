const Event = require("../../Base/Event.js");
const logger = require("../../utils/Logger.js");

class Ready extends Event {

    constructor(client) {
        super(client);
    }

    run() {
        logger.success("Bot is online!");
        
        this.client.user.setActivity("Discord Bot List", { type: "COMPETING" });
    }

}

module.exports = Ready;
