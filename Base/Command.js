const { ApplicationCommandType } = require("discord.js");

class Command {

    constructor(client) {
        /**
         * @type {import("./Erbium")}
         */
        this.client = client;

        Object.defineProperties(this, {
            client: { enumerable: false },
        });
    }

    config(conf) {
        this.help = {
            name: conf.name,
            aliases: conf.aliases ?? [],
            description: conf.description ?? "None",
            type: conf.type ?? ApplicationCommandType.ChatInput,
            ownerOnly: !!conf.ownerOnly,
            botPerms: conf.botPerms ?? [],
            permissions: conf.permissions ?? [],
            options: conf.options ?? [],
            subcommand: conf.subcommand ?? false,
            cooldown: conf.cooldown ?? 3000,
            category: null,
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
