import Event from "../../Base/Event.js";
import { success } from "../../utils/Logger.js";

class Ready extends Event {

    constructor(client) {
        super(client);
    }

    run() {
        success("Bot is online!");
        
        this.client.user.setActivity("Discord Bot List", { type: "COMPETING" });
    }

}

export default Ready;
