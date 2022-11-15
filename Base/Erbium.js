import { Client } from "discord.js";
import { readdirSync } from "fs";
import config from "../config.js";
import Util from "../utils/util.js"
import Command from "../utils/Command.js";
import logger from "../utils/Logger.js";
import Database from "./Database";

class Erbium extends Client {

    constructor() {
        super({
            ws: { properties: { $browser: "Discord Android" } },
            intents: [
                "GUILDS",
                "GUILD_EMOJIS_AND_STICKERS",
                "GUILD_MEMBERS",
                "GUILD_MESSAGES",
                "GUILD_MESSAGE_REACTIONS",
                "GUILD_MESSAGE_TYPING",
                "GUILD_PRESENCES",
                "GUILD_VOICE_STATES",
            ],
            allowedMentions: {
                repliedUser: false
            }
        });

        this.commands = new Command(this);
        this.config = config;
        this.utils = Util
        this.db = new Database(this);

        Object.defineProperties(this, {
            config: { enumerable: false },
        });
    }

    get database() {
        return this.db;
    }

    async registerCommands() {
        const commandsDir = this.config.COMMANDS_DIR;

        // load commands
        const CATS = readdirSync(commandsDir);

        for (const CAT of CATS) {
            logger.info(`[${CATS.indexOf(CAT) + 1}/${CATS.length}] Loading category ${CAT}`);
            const COMMANDS = readdirSync(`${commandsDir}/${CAT}`).filter(x => x.endsWith(".js"));

            let i = 0;
            for (const c of COMMANDS) {
                logger.info(`[${i + 1}/${COMMANDS.length}] Loading command ${c} (${CAT})`);
                const cmd = await import(`${commandsDir}/${CAT}/${c}`); 
                const command = new cmd.default(this);

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

    async registerEvents() {
        const eventsDir = this.config.EVENTS_DIR;

        // load events
        const EVENTS = readdirSync(eventsDir).filter(x => x.endsWith(".js"));

        let i = 0;

        for (const event of EVENTS) {
            logger.info(`[${i + 1}/${EVENTS.length}] Loading event ${event}`);
            const ev = await import(`${eventsDir}/${event}`);
            const evn = new ev(this);

            void this.on(event.replace(".js", ""), async (...args) => {
                try {
                    await evn.run(...args);
                } catch(e) {
                    logger.error(`Event: ${event.replace(".js", "")} :- ${e.toString()}`);
                }
            });

            delete require.cache[require.resolve(`${eventsDir}/${event}`)];

            logger.success(`[${i + 1}/${event.length}] Loaded event ${event}`);

            i++;
        }
    }

    resolveUser(usernameOrUserResolvable, multiple = false) {
        if (usernameOrUserResolvable && typeof usernameOrUserResolvable === "string" && !parseInt(usernameOrUserResolvable)) {
            const name = usernameOrUserResolvable.toUpperCase();
            const arr = [];
            this.users.cache.forEach(user => {
                if (user.username.toUpperCase().indexOf(name) < 0) return;
                return arr.push(user);
            });
            return multiple ? arr : arr[0];
        } else {
            return usernameOrUserResolvable ? (multiple ? [this.users.resolve(usernameOrUserResolvable)] : this.users.resolve(usernameOrUserResolvable)) : null;
        }
    }

    async login() {
        logger.info("Starting the bot...");

        this.registerCommands();
        this.registerEvents();

        return await super.login();
    }

}

export default Erbium;