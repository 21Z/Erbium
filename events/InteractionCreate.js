const Event = require("../Base/Event.js");

class InteractionCreate extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    async run(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const commands = this.client.Slashcommands;
        const subcommands = this.client.Subcommands;
        const command = subcommands.resolve(interaction.options._subcommand) || commands.resolve(interaction.commandName);

        if (!interaction.member.permissions.has(command.help.permissions)) return interaction.reply(`❌ | You don't have enough permissions to use this command!\nPermissions Required: ${command.help.permissions.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);
        if (!interaction.guild.members.me.permissionsIn(interaction.channel).has(command.help.botPerms)) return interaction.reply(`❌ | I do not have enough permissions to use this command!\nPermissions Required: ${command.help.botPerms.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);

        if (!command) return;

        try {
            await command.run(interaction);
        } catch (error) {
            this.client.logger.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }

    }

}

module.exports = InteractionCreate;
