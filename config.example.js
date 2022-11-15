const config = {
    COMMANDS_DIR: `${__dirname}/commands`, // commands dir
    EVENTS_DIR: `${__dirname}/events/DiscordEvents`, // events dir
    PLAYER_EVENTS_DIR: `${__dirname}/events/PlayerEvents`, // player events dir
    DEV_MODE: false, // dev mode
    OWNER: ["1234567890123456"], // Bot owner id
    DEFAULT_PREFIX: "er!", // default command prefix
    PORT: process.env.PORT || 3000, // web server port

    // session secret
    SESSION_SECRET: "SNOWFLAKE-IS-A.DEV__oR__snowflake-is-a.dev__Or__SnOwFlAkE.iS.a.DeV---huh!?",
    // discord invite
    DISCORD_INVITE: "https://discord.gg/myserver",
    // oauth scopes
    SCOPES: ["identify", "guilds"],
    // auth redirect uri
    AUTH_URL: "https://discord.com/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code&scope={SCOPES}",
    // callback from discord oauth
    REDIRECT_URI: "http://localhost:3000/authorize/callback",
    // for oauth2 token
    AUTH_TOKEN_URL: "https://discord.com/api/oauth2/token",
    // for oauth2 user info
    AUTH_GET_USER: "https://discord.com/api/users/@me",
    // for oauth2 guilds info
    AUTH_GET_USER_GUILDS: "https://discord.com/api/users/@me/guilds",
    // client secret
    CLIENT_SECRET: process.env.CLIENT_SECRET
};

module.exports = config;
