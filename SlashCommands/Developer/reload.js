const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Reload extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "reload",
            description: "Reload all bot commands",
            ownerOnly: true,
        });
    }

    async run(interaction) {
        await interaction.reply({ embeds: [createEmbed("info", "Reloading all commands...")] });
        const commands = this.client.commands.commands;
        const Slashcommands = this.client.Slashcommands.commands;

        commands.forEach(command => {
            command.help.aliases.forEach(alias => {
                this.client.commands.aliases.delete(alias);
            });
            commands.delete(command.help.name);
        });
        Slashcommands.forEach(command => {
            Slashcommands.delete(command.help.name);
        });

        this.client.registerCommands();
        this.client.registerSlashCommands();
        interaction.editReply({ embeds: [createEmbed("success", "Succesfully reloaded all commands!")] });
    }

}

module.exports = Reload;
