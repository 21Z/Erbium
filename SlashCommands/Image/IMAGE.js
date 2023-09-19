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

    async run(interaction) {
        const Subcommand = interaction.options.getSubcommand();
        require(`./${Subcommand}`).run(interaction);
    }

}

module.exports = Image;
