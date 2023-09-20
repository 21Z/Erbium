const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Spank extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "spank",
            description: "Spank someone",
            subcommand: true,
            options: [
                {
                    name: "user",
                    description: "The user to run the command on",
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const user = interaction.options.getUser("user");
        if (user === interaction.user) return interaction.reply({ content: "Spank yourself?", ephemeral: true });

        await interaction.deferReply();
        const img = await Canvacord.spank(interaction.user.displayAvatarURL({ extension: "png", size: 2048 }), user.displayAvatarURL({ extension: "png", size: 2048 }));
        const attachment = new AttachmentBuilder(img, { name: "spank.png" });


        return interaction.reply({ embeds: [createEmbed("info").setImage("attachment://spank.png")], files: [attachment] });
    }

}

module.exports = Spank;