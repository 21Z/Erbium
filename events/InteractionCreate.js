const Event = require("../Base/Event.js");

class InteractionCreate extends Event {

    constructor(client) {
        super(client);
        this.config({});
    }

    async run(interaction) {
        interaction.user.dev = this.client.config.OWNER.some(x => x === interaction.user.id);
        if (!interaction.isChatInputCommand()) return;
        const commands = this.client.Slashcommands;
        const command = commands.resolve(interaction.options._subcommand) || commands.resolve(interaction.commandName);

        // dev mode
        if (this.client.config.DEV_MODE && !interaction.user.dev) return interaction.reply({ content: "Commands are restricted to developers only!", ephemeral: true });
        if (command.help.ownerOnly && !interaction.user.dev) return;

        if (!interaction.member.permissions.has(command.help.permissions)) return interaction.reply(`❌ | You don't have enough permissions to use this command!\nPermissions Required: ${command.help.permissions.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);
        if (!interaction.guild.members.me.permissionsIn(interaction.channel).has(command.help.botPerms)) return interaction.reply(`❌ | I do not have enough permissions to use this command!\nPermissions Required: ${command.help.botPerms.map(m => `\`${m.replace(/([A-Z])/g, " $1").trim()}\``).join(", ")}`);
        if (!command) return;

        try {
            await command.run(interaction);
        } catch (error) {
            this.client.logger.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
                .catch(() => { interaction.editReply({ content: "There was an error while executing this command!" }); });
        }

    }

}

module.exports = InteractionCreate;
