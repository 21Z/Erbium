const { Structures } = require("discord.js");

Structures.extend("Message", BaseMessage => {
    return class Message extends BaseMessage {

        constructor(...props) {
            super(...props);
        }

        get args() {
            const makeArgs = (m) => {
                const arg = m.slice(this.guild.prefix.length).trim().split(/ +/);

                return [arg.shift().toLowerCase(), arg];
            };

            return {
                default: makeArgs(this.content),
                clean: makeArgs(this.cleanContent)
            };
        }

        get commandFlag() {
            const regex = /--([\wа-я]+)(\s([\wа-я]+))?/gi;
            const table = {
                "true": true,
                "false": false,
                "undefined": undefined,
                "null": null
            };

            return (this.args.default.pop().join(" ").match(regex) ?? []).map((el) => {
                const [tag, val] = el.slice(2).split(" ");
                return { [tag]: table[val] ?? val ?? null };
            });
        }
    }
})