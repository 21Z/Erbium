const { GuildMember } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")(moment);

class Util {

    static properCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    static formatDuration(dur) {
        return moment.duration(dur).format(" M [Month(s)], D [Day(s)], H [Hour(s)], m [Minute(s)], s [Second(s)]");
    }

    static cleanText(text, token = process.env.DISCORD_TOKEN) {
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 2 });

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/, "@" + String.fromCharCode(8203))
            .replace(new RegExp(token, "g") ?? "", "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

        return text;
    }

    static reverse(text) {
        return `${text}`.split("").reverse().join("");
    }

    static get buttons() {
        return {
            BLURPLE: 1,
            GRAY: 2,
            GREY: 2,
            GREEN: 3,
            RED: 4,
            URL: 5,
            LINK: 5
        };
    }

    static atob(text) {
        return Buffer.from(text ?? "", "base64").toString("utf-8");
    }

    static btoa(text) {
        return Buffer.from(text ?? "").toString("base64");
    }
}

module.exports = Util;