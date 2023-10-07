const Command = require("../../Base/Command.js");

class Base64 extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "base64",
            aliases: ["b64"],
            description: "Encode/Decode base64",
        });
    }

    async run(message, args) {
        const [func, ...rawstring] = args;
        const string = rawstring.join(" ");
        const encode = ["encode", "enc", "e", "-e", "btoa"];
        const decode = ["decode", "dec", "d", "-d", "atob"];

        try {
            if (encode.some(value => value.toLowerCase() === func.toLowerCase())) {
                const text = string;
                const encodedText = btoa(text);
                message.reply(`Encoded Text: \`\`\`\n${encodedText}\`\`\``);
            }
            if (decode.some(value => value.toLowerCase() === func.toLowerCase())) {
                const text = string;
                const decodedText = atob(text);
                message.reply(`Decoded Text: \`\`\`\n${decodedText}\`\`\``);
            }
        } catch (error) {
            message.reply(`\`\`\`js\n${error}\`\`\``);
        }

    }

}

module.exports = Base64;
