const { Structures } = require("discord.js");

Structures.extend("User", BaseUser => {
    return class User extends BaseUser {

        constructor(...props) {
            super(...props);
        }

        get dev() {
            return this.client.config.OWNER.some(x => x === this.id);
        }

        get isAdmin() {
            return this.dev;
        }

    }
})