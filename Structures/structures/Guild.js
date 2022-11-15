const { Structures } = require("discord.js");

Structures.extend("Guild", BaseGuild => {
    return class Guild extends BaseGuild {

        constructor(...props) {
            super(...props);
        }

        get prefix() {
            if (!this.client.database.guilds.has(`prefix_${this.id}`)) this.client.database.guilds.set(`prefix_${this.id}`, this.client.config.DEFAULT_PREFIX);
            return this.client.database.guilds.get(`prefix_${this.id}`);
        }

        set prefix(prefix) {
            prefix = typeof prefix === "string" ? prefix : this.client.config.DEFAULT_PREFIX;
            this.client.database.guilds.set(`prefix_${this.id}`, prefix);
        }

    }
})