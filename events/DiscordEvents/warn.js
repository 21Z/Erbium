import Event from "../../Base/Event.js";
import { warn } from "../../utils/Logger.js";

class Warn extends Event {

    constructor(client) {
        super(client);
    }

    run(message) {
        warn(`WARN :- ${message}`);
    }

}

export default Warn;