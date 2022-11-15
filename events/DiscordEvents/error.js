import Event from "../../Base/Event.js";
import { error } from "../../utils/Logger.js";

class ErrorEvent extends Event {

    constructor(client) {
        super(client);
    }

    run(e) {
        error(`ERROR :- ${e}`);
    }

}

export default ErrorEvent;