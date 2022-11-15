class Command {

    constructor(client) {
        /**
         * @type {import("./Erbium")}
         */
        this.client = client;

        Object.defineProperties(this, {
            client: { enumerable: false }
        });
    }

    config(conf) {
        this.help = {
            name: conf.name,
            aliases: conf.aliases ?? [],
            description: conf.description ?? "None",
            ownerOnly: !!conf.ownerOnly,
            permissions: conf.permissions ?? [],
            category: null,
            cooldown: 3000
        };
        this.path = null;
    }

    setCategory(cat, force = false) {
        this.help.category = !force && this.help.category ? this.help.category : cat;
    }

    setPath(path) {
        this.path = path;
    }

    get category() {
        return this.help.category;
    }

    get cooldown() {
        return this.help.cooldown;
    }

    run() {}

    toString() {
        return this.help.name;
    }

    toJSON() {
        return { ...this.help };
    }

}

module.exports = Command;