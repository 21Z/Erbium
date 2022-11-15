const { Database } = require("@devsnowflake/quick.db");

class ErbiumDb {

    constructor(client) {
        this.client = client;

        this.root = new Database("data/erbium.db", {
            path: "data",
            table: "ROOT",
            useWalMode: true
        });

        this.tags = this.root.createTable("TAGS");
        this.guilds = this.root.createTable("GUILDS");

        Object.defineProperties(this, {
            client: { enumerable: false }
        });
    }

}

module.exports = ErbiumDb;