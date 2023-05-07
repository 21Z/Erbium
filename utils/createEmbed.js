const { EMBED_COLOR, SuccessEmoji, ErrorEmoji } = require("../config.js");
const { EmbedBuilder } = require("discord.js");

const hexColors = {
    error: "Red",
    info: EMBED_COLOR,
    success: "Green",
    warn: "Yellow",
};
function createEmbed(type, message, emoji = false) {
    const embed = new EmbedBuilder().setColor(hexColors[type]);

    if (message) embed.setDescription(message);
    if (type === "error" && emoji) embed.setDescription(`${ErrorEmoji} **|** ${message}`);
    if (type === "success" && emoji) embed.setDescription(`${SuccessEmoji} **|** ${message}`);
    return embed;
}

module.exports = createEmbed;
