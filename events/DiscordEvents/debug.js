import Event from "../../Base/Event.js";
import { info } from "../../utils/Logger.js";

class Debug extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        if (!this.client.config.DEV_MODE) return;

        info(`DEBUG :- ${message}`);
    }

}

export default Debug;