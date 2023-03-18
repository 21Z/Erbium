/* eslint-disable no-inline-comments */
const config = {
    SLASH_COMMANDS_DIR: `${__dirname}/SlashCommands`, // Slash commands dir
    COMMANDS_DIR: `${__dirname}/commands`, // commands dir
    EVENTS_DIR: `${__dirname}/events`, // events dir
    DEV_MODE: false, // dev mode
    OWNER: ['1234567890123456'], // Bot owner id
    CLIENT_ID: ['1234567890123456'], // Bot id
    GUILD_ID: '1234567890123456', // your server ID for message edit/delete logs
    PREFIX: '-', // command prefix
    EMBED_COLOR: 'Random', // embed color
};

module.exports = config;