class Event {

    constructor(client) {
        this.client = client;
        Object.defineProperties(this, {
            client: { enumerable: false }
        });
    }

    run() {}

}

module.exports = Event;