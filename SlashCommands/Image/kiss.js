const Command = require("../../Base/Command.js");
const { Canvas: Canvacord } = require("canvacord");
const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const createEmbed = require("../../utils/createEmbed.js");

class Kiss extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "kiss",
            description: "Kiss your partner",
            subcommand: true,
            options: [
                {
                    name: "user",
                    description: "The user to run the command on",
                    required: true,
                    type: ApplicationCommandOptionType.User,
                },
            ],
        });
    }

    async run(interaction) {
        const user = interaction.options.getUser("user");
        if (user === interaction.user) return interaction.reply({ content: "Kiss yourself?", ephemeral: true });

        await interaction.deferReply();
        const img = await Canvacord.kiss(interaction.user.displayAvatarURL({ extension: "png", size: 2048 }), user.displayAvatarURL({ extension: "png", size: 2048 }));
        const attachment = new AttachmentBuilder(img, { name: "kiss.png" });


        return interaction.reply({ embeds: [createEmbed("info").setImage("attachment://kiss.png")], files: [attachment] });
    }

}

module.exports = Kiss;
