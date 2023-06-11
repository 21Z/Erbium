class Event {

    constructor(client) {
        this.client = client;
        Object.defineProperties(this, {
            client: { enumerable: false },
        });
    }

    config(conf) {
        this.data = {
            name: conf.name,
            once: conf.once ?? false,
        };
    }

    run() {}

}

module.exports = Event;
