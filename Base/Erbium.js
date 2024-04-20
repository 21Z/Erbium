const { ApplicationCommandOptionType, Client, Events, GatewayIntentBits, REST, Routes } = require("discord.js");
const fs = require("fs");
const config = require("../config.js");
const Command = require("../utils/Command.js");
const logger = require("../utils/Logger.js");
const Database = require("./Database");

class Erbium extends Client {

    constructor() {
        super({
            ws: { properties: { $browser: "Discord Android" } },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
            ],
            allowedMentions: {
                repliedUser: false,
            },
        });

        this.commands = new Command(this);
        this.Slashcommands = new Command();
        this.config = config;
        this.logger = logger;
        this.utils = require("../utils/util");
        this.db = new Database(this);

        Object.defineProperties(this, {
            config: { enumerable: false },
        });
    }

    get database() {
        return this.db;
    }

    async registerSlashCommands() {
        const mainCommands = [];
        const SlashCommandsDir = config.SLASH_COMMANDS_DIR;
        const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
        const CATS = fs.readdirSync(SlashCommandsDir);

        // load slash commands
        for (const CAT of CATS) {
            logger.info(`[${CATS.indexOf(CAT) + 1}/${CATS.length}] Loading category ${CAT}`);
            const COMMANDS = fs.readdirSync(`${SlashCommandsDir}/${CAT}`).filter(x => x.endsWith(".js"));

            let i = 0;
            for (const c of COMMANDS) {
                const cmd = require(`${SlashCommandsDir}/${CAT}/${c}`);
                const command = new cmd(this);

                if (!command.help.subcommand) {
                    this.Slashcommands.setCommand(command.help.name, command);
                } else if (command.help.subcommand === "main") {
                    mainCommands.push(command);
                } else {
                    command.help.type = ApplicationCommandOptionType.Subcommand;
                    this.Slashcommands.setCommand(command.help.name, command);
                }
                command.setCategory(CAT);
                command.setPath(`${SlashCommandsDir}/${CAT}/${c}`);

                delete require.cache[require.resolve(`${SlashCommandsDir}/${CAT}/${c}`)];
                logger.success(`[${i + 1}/${COMMANDS.length}] Loaded slash command ${c} (${CAT})`);
                i++;
            }
        }
        for (const cmd of mainCommands) {
            cmd.help.options = this.Slashcommands.commands.filter(c => c.help.subcommand === true && c.category === cmd.category).toJSON();
            this.Slashcommands.setCommand(cmd.help.name, cmd);
        }

        try {
            const commands = this.Slashcommands.commands.filter(c => c.help.subcommand !== true);
            if (commands.size === 0) logger.error("Couldn't find any application commands");
            logger.info(`Started refreshing ${commands.size} application (/) commands.`);

            const data = await rest.put(
                Routes.applicationCommands(config.CLIENT_ID),
                { body: commands.toJSON() },
            );

            logger.success(`Successfully reloaded ${data.length} application (/) command.`);
        } catch (error) {
            logger.error(error);
        }
    }

    async registerCommands() {
        const CommandsDir = config.COMMANDS_DIR;
        const CATS = fs.readdirSync(CommandsDir);

        // load commands
        for (const CAT of CATS) {
            logger.info(`[${CATS.indexOf(CAT) + 1}/${CATS.length}] Loading category ${CAT}`);
            const COMMANDS = fs.readdirSync(`${CommandsDir}/${CAT}`).filter(x => x.endsWith(".js"));

            let i = 0;
            for (const c of COMMANDS) {
                const cmd = require(`${CommandsDir}/${CAT}/${c}`);
                const command = new cmd(this);

                command.setCategory(CAT);
                command.setPath(`${CommandsDir}/${CAT}/${c}`);

                this.commands.setCommand(command.help.name, command);
                command.help.aliases.forEach(alias => this.commands.setAlias(alias, command.help.name));

                delete require.cache[require.resolve(`${CommandsDir}/${CAT}/${c}`)];

                logger.success(`[${i + 1}/${COMMANDS.length}] Loaded command ${c} (${CAT})`);
                i++;
            }
        }
    }

    registerEvents() {
        const eventsDir = config.EVENTS_DIR;

        // load events
        const EVENTS = fs.readdirSync(eventsDir).filter(x => x.endsWith(".js"));
        let i = 0;

        for (const event of EVENTS) {
            logger.info(`[${i + 1}/${EVENTS.length}] Loading event ${event}`);
            const ev = require(`${eventsDir}/${event}`);
            const evn = new ev(this);

            this[evn.data.once ? "once" : "on"](Events[event.replace(".js", "")], async (...args) => {
                try {
                    await evn.run(...args);
                } catch (e) {
                    logger.error(`Event: ${event.replace(".js", "")} :-`, e);
                }
            });

            delete require.cache[require.resolve(`${eventsDir}/${event}`)];

            logger.success(`[${i + 1}/${EVENTS.length}] Loaded event ${event}`);
            i++;
        }
    }

    async resolveUser(userResolvable, guild, multiple = false) {
        if (!userResolvable) return null;
        const userResolvables = userResolvable.split(",").map(resolvable => resolvable.trim());
        const resolvedUsers = [];

        for (const resolvable of userResolvables) {
            if (resolvedUsers.length > 0 && !multiple) break;
            if (/<@!?(.*?)>/g.test(resolvable)) {
                const userId = resolvable.match(/<@!?(.*?)>/g)[0].replace(/[<@!>]/g, "");
                resolvedUsers.push(guild ? guild.members.resolve(userId) : this.users.resolve(userId));
            } else if (resolvable && typeof resolvable === "string" && !/^\d{17,19}$/.test(resolvable) && !/<@!?(.*?)>/g.test(resolvable)) {
                const name = resolvable.toUpperCase();
                this.users.cache.forEach(user => {
                    if (user.username.toUpperCase().indexOf(name) >= 0) {
                        resolvedUsers.push(guild ? guild.members.resolve(user) : user);
                    }
                });
            } else {
                guild ? await guild.members.fetch(resolvable).catch(() => {}) : await this.users.fetch(resolvable).catch(() => {});
                const resolvedUser = guild ? guild.members.resolve(resolvable) : this.users.resolve(resolvable);
                if (resolvedUser) resolvedUsers.push(resolvedUser);
            }
        }
        return multiple ? resolvedUsers : resolvedUsers[0];
    }

    async login() {
        logger.info("Starting the bot...");

        this.registerSlashCommands();
        this.registerCommands();
        this.registerEvents();

        return await super.login();
    }

}

module.exports = Erbium;
