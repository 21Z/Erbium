const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');

const fs = require('fs');
const config = require('../config.js');
const Command = require('../utils/Command.js');
const logger = require('../utils/Logger.js');
const Database = require('./Database');

class Erbium extends Client {

    constructor() {
        super({
            ws: { properties: { $browser: 'Discord Android' } },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            allowedMentions: {
                repliedUser: false,
            },
        });

        this.commands = new Command(this);
        this.SlashCommands = new Collection();
        this.config = config;
        this.utils = require('../utils/util');
        this.db = new Database(this);

        Object.defineProperties(this, {
            config: { enumerable: false },
        });
    }

    get database() {
        return this.db;
    }
    async registerSlashCommands() {
        const commands = [];

        const commandFiles = fs.readdirSync(this.config.SLASH_COMMANDS_DIR).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = `${this.config.SLASH_COMMANDS_DIR}/${file}`;
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                this.SlashCommands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            }
            else {
                logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
            const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
            (async () => {
                try {
                    if (commands.length === 0) return logger.error('Couldn\'t find any application commands');
                    logger.info(`Started refreshing ${commands.length} application (/) command.`);

                    const data = await rest.put(
                        Routes.applicationCommands(this.config.CLIENT_ID),
                        { body: commands },
                    );

                    logger.success(`Successfully reloaded ${data.length} application (/) command.`);
                }
                catch (error) {
                    console.error(error);
                }
            })();
        }
    }
    registerCommands() {
        const commandsDir = this.config.COMMANDS_DIR;

        // load commands
        const CATS = fs.readdirSync(commandsDir);

        for (const CAT of CATS) {
            logger.info(`[${CATS.indexOf(CAT) + 1}/${CATS.length}] Loading category ${CAT}`);
            const COMMANDS = fs.readdirSync(`${commandsDir}/${CAT}`).filter(x => x.endsWith('.js'));

            let i = 0;
            for (const c of COMMANDS) {
                logger.info(`[${i + 1}/${COMMANDS.length}] Loading command ${c} (${CAT})`);

                const cmd = require(`${commandsDir}/${CAT}/${c}`);
                const command = new cmd(this);

                command.setCategory(CAT);
                command.setPath(`${commandsDir}/${CAT}/${c}`);

                this.commands.setCommand(command.help.name, command);
                command.help.aliases.forEach(alias => this.commands.setAlias(alias, command.help.name));

                delete require.cache[require.resolve(`${commandsDir}/${CAT}/${c}`)];

                logger.success(`[${i + 1}/${COMMANDS.length}] Loaded command ${c} (${CAT})`);
                i++;
            }
        }
    }

    registerEvents() {
        const eventsDir = this.config.EVENTS_DIR;

        // load events
        const EVENTS = fs.readdirSync(eventsDir).filter(x => x.endsWith('.js'));

        let i = 0;

        for (const event of EVENTS) {
            logger.info(`[${i + 1}/${EVENTS.length}] Loading event ${event}`);
            const ev = require(`${eventsDir}/${event}`);
            const evn = new ev(this);

            void this.on(event.replace('.js', ''), async (...args) => {
                try {
                    await evn.run(...args);
                }
                catch (e) {
                    logger.error(`Event: ${event.replace('.js', '')} :- ${e.toString()}`);
                }
            });

            delete require.cache[require.resolve(`${eventsDir}/${event}`)];

            logger.success(`[${i + 1}/${event.length}] Loaded event ${event}`);

            i++;
        }
    }

    resolveUser(usernameOrUserResolvable, multiple = false) {
        if (usernameOrUserResolvable && typeof usernameOrUserResolvable === 'string' && !parseInt(usernameOrUserResolvable)) {
            const name = usernameOrUserResolvable.toUpperCase();
            const arr = [];
            this.users.cache.forEach(user => {
                if (user.username.toUpperCase().indexOf(name) < 0) return;
                return arr.push(user);
            });
            return multiple ? arr : arr[0];
        }
        else {
            return usernameOrUserResolvable ? (multiple ? [this.users.resolve(usernameOrUserResolvable)] : this.users.resolve(usernameOrUserResolvable)) : null;
        }
    }

    async login() {
        logger.info('Starting the bot...');

        this.registerSlashCommands();
        this.registerCommands();
        this.registerEvents();

        return await super.login();
    }

}

module.exports = Erbium;
