const { QuickDB } = require("quick.db");

class ErbiumDb {

    constructor(client) {
        this.client = client;

        this.root = new QuickDB({
            filePath: "database.sqlite",
        });

        this.tags = this.root.table("TAGS");

        Object.defineProperties(this, {
            client: { enumerable: false },
        });
    }

}

module.exports = ErbiumDb;
