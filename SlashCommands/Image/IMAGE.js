const Command = require("../../Base/Command.js");

class Image extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "image",
            description: "Image Manipulation",
            subcommand: "main",
        });
    }

}

module.exports = Image;
