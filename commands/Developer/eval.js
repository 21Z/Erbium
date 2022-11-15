const Command = require("../../Base/Command");

// for Eval
const Discord = require("discord.js");

class Eval extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "eval",
            aliases: ["ev"],
            description: "Evaluates Arbitrary JavaScript Code",
            ownerOnly: true
        });
    }

    async run(message, args) {
        let code = args.join(" ");
        if (!code) return message.reply("❌ | Please specify code to eval!");

        const awaiter = message.commandFlag.find(x => "await" in x);
        if (awaiter) code = code.replace("--await", "").trim();

        try {
            const ev = this.client.utils.cleanText(awaiter ? await eval(code) : eval(code), this.client.token);

            return message.reply(ev, { code: "js", split: true });
        } catch (e) {
            return message.reply(`${e}`, { code: "js", split: true });
        }
    }

}

module.exports = Eval;