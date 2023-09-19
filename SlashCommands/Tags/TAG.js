const Command = require("../../Base/Command.js");

class Tag extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "tag",
            description: "Tag Management",
            subcommand: "main",
        });
    }

}

module.exports = Tag;
