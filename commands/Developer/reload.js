const Command = require("../../Base/Command.js");
const createEmbed = require("../../utils/createEmbed.js");

class Reload extends Command {

    constructor(client) {
        super(client);

        this.config({
            name: "reload",
            aliases: ["restart"],
            description: "Reload all bot commands",
            ownerOnly: true,
            botPerms: ["EmbedLinks"],
        });
    }

    async run(message) {
        const m = await message.reply({ embeds: [createEmbed("info", "Reloading all commands...")] });
        const commands = this.client.commands.commands;

        commands.forEach(command => {
            command.help.aliases.forEach(alias => {
                this.client.commands.aliases.delete(alias);
            });
            commands.delete(command.help.name);
        });

        this.client.registerCommands();
        m.edit({ embeds: [createEmbed("success", "Succesfully reloaded all commands!")] });
    }

}

module.exports = Reload;
