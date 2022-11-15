import { Structures } from "discord.js";

Structures.extend("GuildMember", BaseMember => {
    return class Member extends BaseMember {

        constructor(...props) {
            super(...props);
        }

        get dev() {
            return this.user.isAdmin;
        }

    }
})