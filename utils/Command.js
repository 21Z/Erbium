const { Collection } = require("discord.js");

class Command {

    constructor(client) {
        this.client = client;
        this.commands = new Collection;
        this.aliases = new Collection;

        Object.defineProperties(this, {
            client: { enumerable: false },
            commands: { enumerable: false },
            aliases: { enumerable: false }
        });
    }

    get size() {
        return this.commands.size;
    }

    resolve(name) {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    has(name) {
        return this.commands.has(name) || this.commands.has(this.aliases.get(name));
    }

    setCommand(name, command) {
        this.commands.set(name, command);
    }

    setAlias(name, value) {
        this.aliases.set(name, value);
    }

    toArray() {
        return [...this.commands.values()];
    }

}

module.exports = Command;